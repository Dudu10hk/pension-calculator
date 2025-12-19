'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  return (
    <>
      <footer className="w-full bg-[#0d141b] text-white py-8 mt-auto">
        <div className="max-w-[960px] mx-auto px-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <button
              onClick={() => setShowPrivacy(true)}
              className="hover:text-[#E7FE55] transition-colors font-semibold"
            >
              מדיניות שמירת פרטיות
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setShowTerms(true)}
              className="hover:text-[#E7FE55] transition-colors font-semibold"
            >
              תנאי שימוש
            </button>
            <span className="text-slate-500">|</span>
            <a
              href="https://lilachinc.com/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E7FE55] transition-colors font-semibold"
            >
              אודות
            </a>
          </div>
          <div className="text-center mt-6 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} כל הזכויות שמורות ללילך כהן - סוכנת ביטוח</p>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPrivacy(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[24px] sm:rounded-3xl shadow-2xl max-w-4xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#E7FE55] px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between border-b-2 border-[#0d141b]/10">
                <h2 className="text-xl sm:text-2xl font-black text-[#0d141b]">מדיניות פרטיות ותנאי שימוש</h2>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0d141b] text-white flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="סגור"
                >
                  <span className="material-symbols-outlined text-sm sm:text-base">close</span>
                </button>
              </div>
              
              <div className="px-6 sm:px-8 py-6 overflow-y-auto max-h-[calc(90vh-80px)] sm:max-h-[calc(85vh-100px)] text-right">
                <div className="prose prose-slate max-w-none text-[#0d141b] space-y-6">
                  <section>
                    <h3 className="text-xl font-black text-[#0d141b] mb-3">מחשבון סימולציית פרישה</h3>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">מפעיל האתר</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      האתר מופעל על ידי <strong>לילך כהן</strong>, סוכנת ביטוח מורשית.<br />
                      אתר: <a href="https://lilachinc.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://lilachinc.com</a>
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700 mt-2">
                      אנו מחויבים לשמירה על פרטיות המשתמשים ולניהול המידע בהתאם לחוק הגנת הפרטיות, התשמ״א–1981, לתקנות הגנת הפרטיות (אבטחת מידע), ובכלל זה תקנה 13, ובהתאם לסטנדרטים המקובלים בגופים פיננסיים בישראל.
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700 mt-2">
                      השימוש באתר ובמחשבון סימולציית גיל הפרישה כפוף למדיניות זו.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">1. סוגי המידע הנאספים</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      במסגרת השימוש במחשבון ובשירותים הנלווים, ייתכן וייאסף מידע מהסוגים הבאים:
                    </p>
                    <div className="mr-4 mt-2 space-y-2">
                      <div>
                        <p className="text-sm font-bold text-[#0d141b]">1.1 מידע שהמשתמש מזין ביוזמתו</p>
                        <p className="text-sm leading-relaxed text-slate-700">
                          גיל, הכנסות והוצאות חודשיות, היקף חיסכון קיים, סכומים שנצברו עד כה, סכומי חיסכון חודשיים, נתונים כלליים לצורך חישוב סימולציה, ופרטי קשר ככל שהמשתמש בוחר להשאירם.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0d141b]">1.2 מידע טכני ותפעולי</p>
                        <p className="text-sm leading-relaxed text-slate-700">
                          כתובת IP, סוג דפדפן ומכשיר, תאריך ושעת שימוש, ונתוני שימוש כלליים לצורכי אבטחה, תפעול ושיפור השירות.
                        </p>
                        <p className="text-sm leading-relaxed text-slate-700 mt-1">
                          המידע הטכני אינו משמש לזיהוי אישי מעבר לנדרש על פי דין.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">2. מטרות איסוף ועיבוד המידע</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      המידע נאסף ומשמש לצרכים הבאים בלבד:
                    </p>
                    <ul className="list-disc mr-6 mt-2 space-y-1 text-sm text-slate-700">
                      <li>ביצוע סימולציה כללית והערכת קצבה חודשית צפויה בגיל פרישה</li>
                      <li>ניתוח ראשוני של מצב החיסכון הפנסיוני</li>
                      <li>העברת נתונים לסוכן ביטוח מורשה לצורך בחינה מקצועית ומתן המלצות אישיות</li>
                      <li>יצירת קשר עם המשתמש בהתאם לבקשתו</li>
                      <li>עמידה בדרישות רגולטוריות, אבטחת מידע וניהול סיכונים</li>
                    </ul>
                    <p className="text-sm leading-relaxed text-slate-700 mt-2 font-semibold">
                      הסימולציה הינה כלי עזר בלבד ואינה מהווה ייעוץ פנסיוני, פיננסי או התחייבות לתוצאה כלשהי.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">3. קשר למסלקה הפנסיונית</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      האתר אינו מבצע חיבור אוטומטי למסלקה הפנסיונית ואינו שואב מידע ממנה ללא פעולה יזומה, מפורשת ומאושרת של המשתמש, באמצעות סוכן ביטוח מורשה ובהתאם לדין.
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700 mt-2">
                      כל שימוש במידע ממקורות חיצוניים, לרבות המסלקה הפנסיונית, יתבצע אך ורק בכפוף להסכמת המשתמש, באמצעות גורם מורשה, ובהתאם להוראות הרגולציה החלות.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">4. מאגר מידע</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      המידע נשמר במאגר מידע ממוחשב, מנוהל ומאובטח בהתאם להוראות החוק, ומשמש אך ורק למטרות המפורטות במדיניות זו.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">5. העברת מידע לצדדים שלישיים</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      המידע יועבר אך ורק לגורמים הבאים:
                    </p>
                    <ul className="list-disc mr-6 mt-2 space-y-1 text-sm text-slate-700">
                      <li>לילך כהן, סוכנת ביטוח מורשית, לצורך מתן המלצה אישית</li>
                      <li>גורמים טכנולוגיים המספקים שירותי תפעול ואבטחה בכפוף להסכמי סודיות</li>
                    </ul>
                    <p className="text-sm leading-relaxed text-slate-700 mt-2">
                      המידע לא יימסר לצדדים שלישיים אחרים, אלא אם נדרש על פי דין או בהסכמת המשתמש.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">6. אבטחת מידע</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      אנו מיישמים אמצעי אבטחת מידע סבירים ומקובלים בהתאם לתקנה 13, לרבות:
                    </p>
                    <ul className="list-disc mr-6 mt-2 space-y-1 text-sm text-slate-700">
                      <li>בקרות גישה והרשאות</li>
                      <li>הצפנה ואמצעי הגנה טכנולוגיים</li>
                      <li>נהלים ארגוניים לצמצום חשיפה ושימוש בלתי מורשה</li>
                    </ul>
                    <p className="text-sm leading-relaxed text-slate-700 mt-2">
                      עם זאת, אין באפשרותנו להבטיח חסינות מוחלטת מפני חדירה או שימוש בלתי מורשה.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">7. נגישות</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      אנו מחויבים להנגשת האתר והשירותים הדיגיטליים שלנו לאנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח–1998, ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג–2013.
                    </p>
                    <div className="mr-4 mt-2 space-y-2">
                      <div>
                        <p className="text-sm font-bold text-[#0d141b]">7.1 התאמות נגישות באתר</p>
                        <p className="text-sm leading-relaxed text-slate-700">
                          האתר נבנה באופן נגיש ומותאם לבעלי מוגבלויות, ובכלל זה:
                        </p>
                        <ul className="list-disc mr-6 mt-1 space-y-1 text-sm text-slate-700">
                          <li>תמיכה בתוכנות קוראי מסך לעיוורים ולקויי ראייה</li>
                          <li>ניווט באמצעות מקלדת בלבד</li>
                          <li>התאמת ניגודיות צבעים וגודל טקסט</li>
                          <li>תיאורים חלופיים לתמונות ואלמנטים גרפיים</li>
                          <li>מבנה היררכי ברור של תוכן האתר</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0d141b]">7.2 תקן נגישות</p>
                        <p className="text-sm leading-relaxed text-slate-700">
                          האתר עומד בדרישות תקן הנגישות הישראלי (ת"י 5568) ובהנחיות WCAG 2.0 ברמה AA.
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0d141b]">7.3 דיווח על בעיות נגישות</p>
                        <p className="text-sm leading-relaxed text-slate-700">
                          אם נתקלתם בבעיית נגישות באתר או שיש לכם הצעות לשיפור הנגישות, אנא פנו אלינו באמצעות פרטי הקשר המופיעים באתר. אנו מתחייבים לטפל בכל פנייה בנושא נגישות תוך זמן סביר.
                        </p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">8. זכות עיון, תיקון ומחיקה</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      בהתאם לחוק, כל משתמש זכאי:
                    </p>
                    <ul className="list-disc mr-6 mt-2 space-y-1 text-sm text-slate-700">
                      <li>לעיין במידע השמור אודותיו</li>
                      <li>לבקש תיקון מידע שגוי</li>
                      <li>לבקש מחיקת מידע בכפוף להוראות הדין</li>
                    </ul>
                    <p className="text-sm leading-relaxed text-slate-700 mt-2">
                      פניות בנושא זה ניתן להפנות באמצעות פרטי הקשר המופיעים באתר.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">9. הסכמה ותנאי שימוש</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      השימוש באתר, במחשבון והזנת הנתונים מהווים הסכמה מפורשת למדיניות פרטיות ותנאי שימוש אלה.
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700 mt-2">
                      המשתמש מצהיר כי המידע שהוזן על ידו הינו נכון, וכי ידוע לו שהסימולציה אינה תחליף לייעוץ מקצועי מותאם אישית.
                    </p>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-[#0d141b] mb-2">10. יצירת קשר</h4>
                    <p className="text-sm leading-relaxed text-slate-700">
                      לכל שאלה בנוגע למדיניות זו, לצורך מימוש זכויותיך, או לדיווח על בעיות נגישות, ניתן לפנות אל:
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700 mt-2">
                      <strong>לילך כהן - סוכנת ביטוח</strong><br />
                      אתר: <a href="https://lilachinc.com/about/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://lilachinc.com/about/</a>
                    </p>
                  </section>

                  <section className="border-t pt-4 mt-6">
                    <p className="text-xs text-slate-500 text-center">
                      מסמך זה עודכן לאחרונה: דצמבר 2025<br />
                      © כל הזכויות שמורות ללילך כהן
                    </p>
                  </section>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms of Service Modal (same content for now) */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTerms(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[24px] sm:rounded-3xl shadow-2xl max-w-4xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#E7FE55] px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between border-b-2 border-[#0d141b]/10">
                <h2 className="text-xl sm:text-2xl font-black text-[#0d141b]">תנאי שימוש</h2>
                <button
                  onClick={() => setShowTerms(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0d141b] text-white flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="סגור"
                >
                  <span className="material-symbols-outlined text-sm sm:text-base">close</span>
                </button>
              </div>
              
              <div className="px-6 sm:px-8 py-6 overflow-y-auto max-h-[calc(90vh-80px)] sm:max-h-[calc(85vh-100px)] text-right">
                <div className="prose prose-slate max-w-none text-[#0d141b] space-y-4">
                  <p className="text-sm leading-relaxed text-slate-700">
                    תנאי השימוש זהים למדיניות הפרטיות. השימוש באתר כפוף למדיניות זו במלואה.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    לפרטים מלאים, עיינו במדיניות הפרטיות.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

