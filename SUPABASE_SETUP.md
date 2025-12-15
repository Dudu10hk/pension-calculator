# הגדרת Supabase

## שלב 1: יצירת פרויקט ב-Supabase

1. היכנס ל-[Supabase](https://supabase.com)
2. צור פרויקט חדש
3. שמור את ה-URL וה-Anon Key

## שלב 2: הגדרת משתני סביבה

צור קובץ `.env.local` בתיקיית הפרויקט:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

אתה יכול למצוא את הערכים האלה ב-Supabase Dashboard:
- Settings → API → Project URL
- Settings → API → Project API keys → anon/public

## שלב 3: יצירת הטבלה

1. היכנס ל-Supabase Dashboard
2. לך ל-SQL Editor
3. העתק והדבק את התוכן מ-`supabase/schema.sql`
4. לחץ על "Run"

זה ייצור:
- טבלת `leads` עם כל השדות הנדרשים
- Row Level Security (RLS) policies לאבטחה
- Indexes לביצועים טובים יותר
- Trigger לעדכון אוטומטי של `updated_at`

## שלב 4: בדיקת האבטחה

הטבלה מוגדרת עם Row Level Security:
- **anon** (משתמשים לא מאומתים) יכולים רק להוסיף לידים חדשים
- **authenticated** (משתמשים מאומתים) יכולים לקרוא את הלידים שלהם
- **service_role** (שירות פנימי) יש גישה מלאה

זה מבטיח שהלידים מאובטחים ולא ניתן לגשת אליהם ללא הרשאה.

## שלב 5: בדיקה

לאחר ההגדרה, תוכל לבדוק שהכל עובד:
1. הרץ את הפרויקט: `npm run dev`
2. מלא טופס ליד
3. בדוק ב-Supabase Dashboard → Table Editor → leads שהליד נשמר

