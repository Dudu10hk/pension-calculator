# הוראות פריסה ואבטחה

## הגדרת משתני סביבה (.env)

צור קובץ `.env.local` בשורש הפרויקט עם המשתנים הבאים:

```env
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Email (REQUIRED)
ADMIN_EMAIL=dudu10h@gmail.com

# Email Service - Choose ONE option:

# Option 1: Resend (Recommended)
RESEND_API_KEY=re_your_resend_api_key_here

# Option 2: SMTP (Alternative)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
```

## הגדרת Supabase

### 1. יצירת פרויקט Supabase
1. היכנס ל-[Supabase Dashboard](https://supabase.com)
2. צור פרויקט חדש
3. העתק את ה-URL וה-Anon Key

### 2. הרצת הסכמה
1. היכנס ל-SQL Editor ב-Supabase Dashboard
2. העתק את התוכן מ-`supabase/schema.sql`
3. הרץ את השאילתה

### 3. הגדרת אבטחה (RLS)
הסכמה כוללת:
- ✅ Row Level Security (RLS) מופעל
- ✅ רק `anon` יכול להוסיף לידים (עם ולידציה)
- ✅ רק `service_role` יכול לקרוא לידים (לפאנל אדמין)

### 4. גישה לפאנל אדמין
לצפייה בלידים:
1. השתמש ב-Service Role Key (לא Anon Key!)
2. צור דף אדמין או השתמש ב-Supabase Dashboard
3. גש לטבלה `leads` דרך Table Editor

**⚠️ חשוב:** Service Role Key נותן גישה מלאה - שמור אותו בסוד!

## הגדרת שליחת מייל

### אפשרות 1: Resend (מומלץ)
1. הירשם ב-[Resend](https://resend.com)
2. צור API Key
3. הוסף ל-`.env.local`: `RESEND_API_KEY=re_...`
4. **חינמי עד 3000 מיילים/חודש**

### אפשרות 2: Gmail SMTP
1. הפעל 2-factor authentication ב-Gmail
2. צור App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. הוסף ל-`.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

### אפשרות 3: SMTP אחר
- Outlook: `smtp-mail.outlook.com:587`
- Yahoo: `smtp.mail.yahoo.com:587`
- Custom: `your_smtp_server:port`

## אבטחה

### Rate Limiting
- ✅ 10 הגשות מקסימום לשעה לכל IP
- ✅ 5 מיילים מקסימום לשעה לכל IP
- ⚠️ בפרודקשן, מומלץ להשתמש ב-Redis במקום זיכרון

### ולידציה
- ✅ ולידציה מלאה של כל השדות
- ✅ בדיקת פורמט אימייל
- ✅ בדיקת תעודת זהות ישראלית
- ✅ בדיקת טלפון ישראלי
- ✅ חובה לאשר תנאי שימוש

### אבטחת Supabase
- ✅ RLS מופעל
- ✅ רק service_role יכול לקרוא נתונים
- ✅ ולידציה ברמת מסד הנתונים

## פריסה

### Vercel (מומלץ)
1. היכנס ל-[Vercel](https://vercel.com)
2. ייבא את הפרויקט מ-GitHub
3. הוסף את כל משתני הסביבה
4. Deploy!

### Netlify
1. היכנס ל-[Netlify](https://netlify.com)
2. ייבא את הפרויקט
3. הוסף משתני סביבה
4. Deploy!

### Cloudflare Pages
1. היכנס ל-[Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pages → Create a project
3. הוסף משתני סביבה
4. Deploy!

## בדיקות לאחר פריסה

1. ✅ בדוק שהטופס נשלח בהצלחה
2. ✅ בדוק שמייל מגיע ל-`dudu10h@gmail.com`
3. ✅ בדוק שהנתונים נשמרים ב-Supabase
4. ✅ בדוק rate limiting (נסה לשלוח יותר מדי פעמים)

## גישה ללידים ב-Supabase

### דרך Dashboard:
1. היכנס ל-Supabase Dashboard
2. בחר את הפרויקט
3. Table Editor → `leads`
4. צפה בכל הלידים

### דרך API (לפיתוח פאנל אדמין):
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ לא Anon Key!
)

const { data } = await supabase
  .from('leads')
  .select('*')
  .order('created_at', { ascending: false })
```

## תמיכה

לשאלות או בעיות:
- בדוק את ה-logs ב-Vercel/Netlify
- בדוק את ה-logs ב-Supabase Dashboard
- בדוק את ה-email logs ב-Resend Dashboard

