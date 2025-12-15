# תהליך יצירת לידים - תכנון פרישה מוקדמת

מערכת מלאה לקבלת לידים לתהליך תכנון פרישה מוקדמת.

## שלבי התהליך

1. **דף שיווקי** - דף שיווקי לתחילת תהליך (ניתן לדלג)
2. **בן כמה אתה** - שאלת גיל נוכחי
3. **גיל פרישה רצוי** - באיזה גיל תרצה לפרוש
4. **הכנסה חודשית** - מה ההכנסה החודשית שלך
5. **הוצאות חודשיות** - כמה אתה מוציא כל חודש
6. **סימולציה ופרטים** - סימולציה וקבלת פרטי משתמש ופרטי ליד

## התקנה

1. התקן את התלויות:
```bash
npm install
```

2. הגדר משתני סביבה:
```bash
cp .env.local.example .env.local
```

עדכן את `.env.local` עם פרטי Supabase שלך:
- `NEXT_PUBLIC_SUPABASE_URL` - כתובת הפרויקט ב-Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - המפתח הציבורי של Supabase

3. הרץ את השרת:
```bash
npm run dev
```

## הגדרת Supabase

### יצירת טבלת לידים

הרץ את ה-SQL הבא ב-Supabase SQL Editor:

```sql
-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  current_age INTEGER,
  retirement_age INTEGER,
  monthly_income NUMERIC,
  monthly_expenses NUMERIC,
  email TEXT,
  phone TEXT,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting leads (public can insert)
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for service role (full access)
CREATE POLICY "Service role full access" ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

## טכנולוגיות

- **Next.js 14** - Framework React עם App Router
- **TypeScript** - טיפוסים חזקים
- **Tailwind CSS** - עיצוב
- **Supabase** - Database ואבטחה
- **Zustand** - ניהול state

## מבנה הפרויקט

```
├── app/
│   ├── layout.tsx          # Layout ראשי
│   ├── page.tsx            # דף בית (מעביר לשלב 1)
│   ├── globals.css         # סגנונות גלובליים
│   └── step/
│       └── [stepNumber]/   # דפי השלבים
├── components/
│   └── steps/              # קומפוננטות השלבים
├── lib/
│   ├── supabase.ts         # הגדרת Supabase
│   └── store.ts            # ניהול state עם Zustand
└── ...
```

