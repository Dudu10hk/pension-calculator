# הוראות פריסה ל-Vercel

## שלב 1: התקנת Vercel CLI (אופציונלי)

אם אתה רוצה לפרוס דרך CLI:
```bash
npm i -g vercel
```

## שלב 2: פריסה דרך Vercel Dashboard (מומלץ)

### א. הכנה
1. ודא שהפרויקט ב-GitHub/GitLab/Bitbucket
2. ודא שה-build עובד: `npm run build`

### ב. יצירת פרויקט ב-Vercel
1. היכנס ל-[Vercel Dashboard](https://vercel.com)
2. לחץ על "Add New Project"
3. בחר את ה-repository שלך
4. Vercel יזהה אוטומטית שזה Next.js

### ג. הגדרת משתני סביבה
הוסף את המשתנים הבאים ב-Vercel Dashboard → Settings → Environment Variables:

**חובה:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_EMAIL=dudu10h@gmail.com
```

**אפשרות 1 - Resend (מומלץ):**
```
RESEND_API_KEY=re_your_resend_api_key
```

**אפשרות 2 - SMTP:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### ד. פריסה
1. לחץ על "Deploy"
2. Vercel יבנה ויפרס את הפרויקט אוטומטית
3. תקבל URL זמני (למשל: `your-project.vercel.app`)

## שלב 3: הגדרת דומיין מותאם אישית

### א. תת-דומיין (Subdomain)
1. ב-Vercel Dashboard → Settings → Domains
2. הוסף: `calculator.lilachinc.com`
3. Vercel ייתן לך DNS records להגדרה
4. הוסף אותם ב-DNS של הדומיין הראשי

### ב. DNS Records להגדרה:
```
Type: CNAME
Name: calculator
Value: cname.vercel-dns.com
```

## שלב 4: בדיקות לאחר פריסה

1. ✅ בדוק שהאתר נטען: `https://calculator.lilachinc.com`
2. ✅ בדוק שהטופס עובד
3. ✅ בדוק שמייל מגיע ל-`dudu10h@gmail.com`
4. ✅ בדוק שהנתונים נשמרים ב-Supabase

## שלב 5: הגדרת Supabase (אם עדיין לא)

1. היכנס ל-[Supabase Dashboard](https://supabase.com)
2. צור פרויקט חדש
3. העתק את ה-URL וה-Anon Key
4. הוסף אותם ל-Vercel Environment Variables
5. הרץ את הסכמה מ-`supabase/schema.sql` ב-SQL Editor

## שלב 6: הגדרת שליחת מייל

### Resend (מומלץ):
1. הירשם ב-[Resend](https://resend.com)
2. צור API Key
3. הוסף ל-Vercel: `RESEND_API_KEY=re_...`

### Gmail SMTP:
1. הפעל 2FA ב-Gmail
2. צור App Password: [כאן](https://myaccount.google.com/apppasswords)
3. הוסף ל-Vercel:
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `SMTP_USER=your_email@gmail.com`
   - `SMTP_PASS=your_app_password`

## פתרון בעיות

### Build נכשל:
- בדוק את ה-logs ב-Vercel Dashboard
- ודא שכל התלויות מותקנות
- בדוק שה-build עובד מקומית: `npm run build`

### מייל לא נשלח:
- בדוק את ה-logs ב-Vercel Functions
- ודא שמשתני הסביבה מוגדרים נכון
- בדוק את ה-logs ב-Resend Dashboard (אם משתמשים ב-Resend)

### Supabase לא עובד:
- ודא שה-URL וה-Anon Key נכונים
- בדוק שה-RLS policies מוגדרים נכון
- בדוק את ה-logs ב-Supabase Dashboard

## תמיכה

לשאלות או בעיות:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

