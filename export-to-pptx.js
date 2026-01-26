const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const PptxGenJS = require('pptxgenjs');

// Read HTML file
const htmlContent = fs.readFileSync(path.join(__dirname, 'DAZ_Investor_Deck.html'), 'utf8');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

// Create new presentation
const pptx = new PptxGenJS();

// Set presentation properties
pptx.author = 'DAZ Team';
pptx.company = 'DAZ';
pptx.title = 'DAZ Investor Deck';
pptx.subject = 'The AGI Core for Real Estate Development';
pptx.layout = 'LAYOUT_WIDE'; // 16:9 aspect ratio

// Color scheme matching the HTML
const colors = {
    navyBlue: '1e3a5f',
    brightBlue: '3b82f6',
    emeraldGreen: '0d9488',
    textWhite: 'ffffff',
    textMuted: '94a3b8',
    warmGray: 'e2e8f0'
};

// Helper function to extract text content (ignoring data-hebrew)
function getTextContent(element) {
    if (!element) return '';
    // Get direct text nodes
    let text = '';
    for (let node of element.childNodes) {
        if (node.nodeType === 3) { // Text node
            text += node.textContent.trim() + ' ';
        } else if (node.nodeType === 1) { // Element node
            // Skip data-hebrew attributes, get actual text
            if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                text += getTextContent(node) + ' ';
            }
        }
    }
    return text.trim().replace(/\s+/g, ' ');
}

// Helper function to clean emoji and special characters for PPTX
function cleanText(text) {
    return text.replace(/[^\x00-\x7F]/g, '').trim(); // Remove non-ASCII (keeps basic text)
}

// Get all slides
const slides = document.querySelectorAll('.slide');

slides.forEach((slide, index) => {
    const slideElement = pptx.addSlide();
    
    // Set background to dark (matching HTML)
    slideElement.background = { color: '000000' };
    
    // Extract main heading (h1)
    const h1 = slide.querySelector('h1');
    if (h1) {
        const titleText = cleanText(getTextContent(h1));
        slideElement.addText(titleText, {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.8,
            fontSize: 36,
            bold: true,
            color: colors.textWhite,
            fontFace: 'Arial'
        });
    }
    
    // Extract subtitle (h2)
    const h2Elements = slide.querySelectorAll('h2');
    let yPos = 1.5;
    h2Elements.forEach((h2, idx) => {
        if (idx < 2) { // Limit to first 2 h2s
            const text = cleanText(getTextContent(h2));
            slideElement.addText(text, {
                x: 0.5,
                y: yPos,
                w: 9,
                h: 0.5,
                fontSize: 24,
                bold: true,
                color: colors.brightBlue,
                fontFace: 'Arial'
            });
            yPos += 0.7;
        }
    });
    
    // Extract paragraphs and lists
    const paragraphs = slide.querySelectorAll('p, li');
    paragraphs.forEach((p, idx) => {
        if (yPos < 6.5 && idx < 8) { // Limit content to fit slide
            const text = cleanText(getTextContent(p));
            if (text && text.length > 0) {
                slideElement.addText(text, {
                    x: 0.5,
                    y: yPos,
                    w: 9,
                    h: 0.4,
                    fontSize: 14,
                    color: colors.warmGray,
                    fontFace: 'Arial',
                    bullet: p.tagName === 'LI' ? true : false
                });
                yPos += 0.5;
            }
        }
    });
    
    // Special handling for title slide
    if (slide.classList.contains('title-slide')) {
        const subtitle = slide.querySelector('.subtitle');
        const tagline = slide.querySelector('.tagline');
        
        if (subtitle) {
            slideElement.addText(cleanText(getTextContent(subtitle)), {
                x: 0.5,
                y: 3,
                w: 9,
                h: 0.6,
                fontSize: 28,
                color: colors.brightBlue,
                fontFace: 'Arial',
                align: 'center'
            });
        }
        
        if (tagline) {
            slideElement.addText(cleanText(getTextContent(tagline)), {
                x: 0.5,
                y: 4,
                w: 9,
                h: 0.5,
                fontSize: 20,
                color: colors.warmGray,
                fontFace: 'Arial',
                align: 'center'
            });
        }
    }
    
    // Handle team photos in slide 6
    if (index === 5) { // Slide 6 (0-indexed)
        const teamImages = slide.querySelectorAll('.team-card-avatar img');
        teamImages.forEach((img, imgIdx) => {
            const imgPath = img.getAttribute('src');
            if (imgPath && fs.existsSync(path.join(__dirname, imgPath))) {
                try {
                    slideElement.addImage({
                        path: path.join(__dirname, imgPath),
                        x: 0.5 + (imgIdx * 3.2),
                        y: 4.5,
                        w: 1.5,
                        h: 1.5
                    });
                } catch (err) {
                    console.warn(`Could not add image ${imgPath}:`, err.message);
                }
            }
        });
    }
});

// Save the presentation
const outputPath = path.join(__dirname, 'DAZ_Investor_Deck.pptx');
pptx.writeFile({ fileName: outputPath })
    .then(() => {
        console.log(`✅ PPTX file created successfully: ${outputPath}`);
    })
    .catch((err) => {
        console.error('❌ Error creating PPTX:', err);
        process.exit(1);
    });
