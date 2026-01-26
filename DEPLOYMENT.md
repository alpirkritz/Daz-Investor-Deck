# Deployment Guide - DAZ Investor Deck

## GitHub Pages (View-Only URL)

המצגת כבר מועלת ל-GitHub. להפעלת GitHub Pages:

1. **גש ל-GitHub Repository:**
   - https://github.com/alpirkritz/Daz-Investor-Deck

2. **הפעל GitHub Pages:**
   - Settings > Pages
   - Source: `main` branch
   - Folder: `/ (root)`
   - Save

3. **קבל את ה-URL:**
   - ה-URL יהיה: `https://alpirkritz.github.io/Daz-Investor-Deck/`
   - יופיע ב-Settings > Pages אחרי כמה דקות

4. **עדכונים:**
   - כל `git push` יעדכן את האתר אוטומטית

---

## יצירת קובץ PPTX

### דרישות:
- Node.js מותקן (v14+)

### שלבים:

1. **התקנת dependencies:**
   ```bash
   npm install
   ```

2. **יצירת PPTX:**
   ```bash
   npm run export-pptx
   ```
   או:
   ```bash
   node export-to-pptx.js
   ```

3. **הקובץ ייווצר:**
   - `DAZ_Investor_Deck.pptx` בתיקיית הפרויקט

### הערות:
- הסקריפט מחלץ טקסט מה-HTML ויוצר slides בסיסיים
- תמונות הצוות (slide 6) ייכללו אם הן קיימות
- עיצוב מותאם לצבעים של המצגת
- אנימציות ו-interactivity לא יעברו ל-PPTX

---

## אפשרויות נוספות

### Netlify Drop (אלטרנטיבה ל-GitHub Pages)
1. גש ל: https://app.netlify.com/drop
2. גרור את תיקיית הפרויקט
3. קבל URL מיידי

### Vercel
```bash
npm i -g vercel
vercel
```
