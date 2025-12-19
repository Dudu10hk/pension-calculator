# 🚀 העלאת הפרויקט ל-GitHub - מדריך מהיר

## שלב 1: יצירת Repository ב-GitHub

1. היכנס ל-[github.com](https://github.com)
2. לחץ על ה-**"+"** בפינה הימנית העליונה
3. בחר **"New repository"**
4. מלא את הפרטים:
   - **Repository name:** `pension-calculator` (או שם אחר)
   - **Description:** "מחשבון סימולציית פרישה"
   - **Public** או **Private** (בחר מה שמתאים לך)
   - **אל תסמן** "Initialize with README" (כי יש לנו כבר קוד)
5. לחץ **"Create repository"**

## שלב 2: העלאת הקוד

GitHub יראה לך הוראות. הנה הפקודות:

```bash
# אם עדיין לא ב-GitHub, הוסף את ה-remote:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# העלה את הקוד:
git branch -M main
git push -u origin main
```

**החלף:**
- `YOUR_USERNAME` = שם המשתמש שלך ב-GitHub
- `YOUR_REPO_NAME` = שם ה-repository שיצרת

## שלב 3: חזור ל-Vercel

1. חזור ל-Vercel Dashboard
2. לחץ **"Add New Project"**
3. בחר את ה-repository שיצרת
4. המשך עם הפריסה!

---

**💡 טיפ:** אם אתה לא רוצה להעלות ל-GitHub, אפשר גם:
- GitLab
- Bitbucket
- או לפרוס ישירות מ-local עם `vercel --prod` (אבל זה פחות נוח)

