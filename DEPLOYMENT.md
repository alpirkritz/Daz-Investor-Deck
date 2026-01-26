# Deployment Guide - DAZ Investor Deck

## GitHub Pages (View-Only URL)

המצגת מוכנה לפרסום! הקובץ `index.html` נוצר אוטומטית.

### שלבים לפרסום:

1. **ודא שהקובץ index.html קיים:**
   ```bash
   ls -la index.html
   ```
   (אם לא קיים, הרץ: `cp DAZ_Investor_Deck.html index.html`)

2. **הוסף ל-git ודחוף:**
   ```bash
   git add index.html
   git commit -m "Add index.html for GitHub Pages deployment"
   git push
   ```

3. **הפעל GitHub Pages:**
   - גש ל: https://github.com/alpirkritz/Daz-Investor-Deck
   - לחץ על **Settings** (מימין למעלה)
   - גלול למטה ל-**Pages** (בסיידבר השמאלי)
   - תחת **Source**, בחר:
     - Branch: `main`
     - Folder: `/ (root)`
   - לחץ **Save**

4. **אם ה-repo הוא פרטי:**
   - GitHub Pages בחינם זמין רק ל-repositories ציבוריים
   - פתרונות:
     - הפוך את ה-repo ל-public זמנית (Settings > General > Danger Zone > Change visibility)
     - או השתמש ב-Netlify/Vercel (ראה למטה)

5. **קבל את ה-URL:**
   - ה-URL יהיה: `https://alpirkritz.github.io/Daz-Investor-Deck/`
   - יופיע ב-Settings > Pages אחרי 1-2 דקות
   - המצגת תהיה זמינה לצפייה בלבד (view-only)

6. **עדכונים עתידיים:**
   - כל `git push` יעדכן את האתר אוטומטית תוך 1-2 דקות

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
