# 🚀 פריסה מהירה ל-Vercel - מדריך שלב אחר שלב

## שלב 1: הכנת הפרויקט ✅
✅ Build עובד  
✅ כל הקבצים נשמרו ב-Git  
✅ הפרויקט מוכן לפריסה

## שלב 2: העלאת הפרויקט ל-GitHub

אם הפרויקט עדיין לא ב-GitHub:

1. צור repository חדש ב-GitHub
2. העלה את הקוד:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## שלב 3: פריסה דרך Vercel Dashboard

### א. התחברות
1. היכנס ל-[vercel.com](https://vercel.com)
2. התחבר עם GitHub/GitLab/Bitbucket

### ב. יצירת פרויקט חדש
1. לחץ על **"Add New Project"**
2. בחר את ה-repository שלך
3. Vercel יזהה אוטומטית שזה Next.js ✅

### ג. הגדרות Build (אופציונלי)
- Build Command: `npm run build` (ברירת מחדל)
- Output Directory: `.next` (ברירת מחדל)
- Install Command: `npm install` (ברירת מחדל)

### ד. הגדרת משתני סביבה (חשוב מאוד!)

לחץ על **"Environment Variables"** והוסף:

#### משתנים חובה:
```
NEXT_PUBLIC_SUPABASE_URL
= העתק מה-Supabase Dashboard

NEXT_PUBLIC_SUPABASE_ANON_KEY  
= העתק מה-Supabase Dashboard

ADMIN_EMAIL
= dudu10h@gmail.com
```

#### משתנים לשליחת מייל (בחר אחד):

**אפשרות 1 - Resend (מומלץ):**
```
RESEND_API_KEY
= העתק מ-Resend Dashboard
```

**אפשרות 2 - Gmail SMTP:**
```
SMTP_HOST
= smtp.gmail.com

SMTP_PORT
= 587

SMTP_USER
= your_email@gmail.com

SMTP_PASS
= your_app_password (מ-Google App Passwords)
```

⚠️ **חשוב:** סמן את כל המשתנים כ-**Production**, **Preview**, ו-**Development**

### ה. פריסה
1. לחץ על **"Deploy"**
2. המתן 2-3 דקות לבנייה
3. תקבל URL: `your-project.vercel.app`

## שלב 4: הגדרת Supabase (אם עדיין לא)

1. היכנס ל-[supabase.com](https://supabase.com)
2. צור פרויקט חדש
3. העתק את ה-URL וה-Anon Key
4. הוסף אותם ל-Vercel Environment Variables
5. היכנס ל-SQL Editor והרץ את הקוד מ-`supabase/schema.sql`

## שלב 5: הגדרת שליחת מייל

### Resend (מומלץ - הכי קל):
1. הירשם ב-[resend.com](https://resend.com) (חינמי עד 3000 מיילים/חודש)
2. צור API Key
3. הוסף ל-Vercel: `RESEND_API_KEY=re_...`

### Gmail SMTP:
1. הפעל 2FA ב-Gmail
2. צור App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. הוסף את המשתנים ל-Vercel

## שלב 6: הגדרת דומיין מותאם אישית

### תת-דומיין: `calculator.lilachinc.com`

1. ב-Vercel Dashboard → **Settings** → **Domains**
2. לחץ **"Add Domain"**
3. הזן: `calculator.lilachinc.com`
4. Vercel ייתן לך DNS record להגדרה

### הגדרת DNS:
היכנס ל-DNS של `lilachinc.com` והוסף:

```
Type: CNAME
Name: calculator
Value: cname.vercel-dns.com
TTL: Auto
```

⏱️ **זמן המתנה:** 5-60 דקות עד שהדומיין יעבוד

## שלב 7: בדיקות

לאחר הפריסה, בדוק:

1. ✅ האתר נטען: `https://calculator.lilachinc.com`
2. ✅ כל השלבים עובדים
3. ✅ הטופס נשלח בהצלחה
4. ✅ מייל מגיע ל-`dudu10h@gmail.com`
5. ✅ הנתונים נשמרים ב-Supabase

## פתרון בעיות

### Build נכשל:
- בדוק את ה-Logs ב-Vercel Dashboard
- ודא שכל משתני הסביבה מוגדרים
- בדוק שה-build עובד מקומית: `npm run build`

### מייל לא נשלח:
- בדוק את ה-Function Logs ב-Vercel
- ודא ש-`RESEND_API_KEY` או `SMTP_*` מוגדרים נכון
- בדוק את ה-logs ב-Resend Dashboard

### Supabase לא עובד:
- ודא שה-URL וה-Anon Key נכונים
- בדוק שה-RLS policies מוגדרים נכון
- בדוק את ה-logs ב-Supabase Dashboard

## תמיכה

- 📚 [Vercel Docs](https://vercel.com/docs)
- 💬 [Vercel Support](https://vercel.com/support)
- 📧 שאלות? צור issue ב-GitHub

---

**🎉 מזל טוב! האתר שלך עכשיו חי ב-Vercel!**

