# הוראות התקנה

## שלב 1: התקנת תלויות

```bash
npm install
```

## שלב 2: הגדרת Supabase

עקוב אחר ההוראות ב-`SUPABASE_SETUP.md` כדי:
1. ליצור פרויקט ב-Supabase
2. להגדיר את משתני הסביבה
3. ליצור את הטבלה

## שלב 3: הרצת הפרויקט

```bash
npm run dev
```

הפרויקט יעלה על `http://localhost:3000`

## מבנה הפרויקט

```
תהליך מסלקה/
├── app/
│   ├── api/leads/          # API route לשמירת לידים
│   ├── step/[stepNumber]/  # דפי השלבים
│   ├── layout.tsx          # Layout ראשי
│   ├── page.tsx           # דף בית
│   └── globals.css        # סגנונות גלובליים
├── components/
│   └── steps/             # קומפוננטות השלבים
│       ├── Step1Marketing.tsx
│       └── Step2Age.tsx
├── lib/
│   ├── supabase.ts        # הגדרת Supabase
│   ├── store.ts           # ניהול state
│   └── leads.ts           # פונקציות לשמירת לידים
├── supabase/
│   └── schema.sql         # SQL schema לטבלת לידים
└── ...
```

## השלבים הקיימים

✅ **שלב 1** - דף שיווקי עם אפשרות לדלג  
✅ **שלב 2** - בן כמה אתה (עם slider)

## השלבים הבאים לבנייה

⏳ **שלב 3** - באיזה גיל תרצה לפרוש  
⏳ **שלב 4** - מה ההכנסה החודשית שלך  
⏳ **שלב 5** - כמה אתה מוציא כל חודש  
⏳ **שלב 6** - סימולציה וקבלת פרטי משתמש

## אבטחה

המערכת מוגדרת עם:
- ✅ Row Level Security (RLS) ב-Supabase
- ✅ Validation ב-API route
- ✅ TypeScript לטיפוסים חזקים
- ✅ Sanitization של קלטים

## פיתוח נוסף

כדי להוסיף שלב חדש:
1. צור קומפוננטה חדשה ב-`components/steps/`
2. הוסף case חדש ב-`app/step/[stepNumber]/page.tsx`
3. עדכן את ה-store ב-`lib/store.ts` אם צריך

