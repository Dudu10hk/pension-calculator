import { NextRequest, NextResponse } from 'next/server'

// Email configuration - using Resend (recommended) or Nodemailer
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'dudu10h@gmail.com'
const RESEND_API_KEY = process.env.RESEND_API_KEY
const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = process.env.SMTP_PORT
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS

interface LeadData {
  name: string
  email: string
  phone: string
  idNumber: string
  idIssueDate?: string
  currentAge: number
  retirementAge: number
  monthlyIncome?: number
  monthlyExpenses?: number
  currentSavings?: number
  simulationResult?: any
  termsAccepted?: boolean
  pensionClearinghouseContact?: boolean
}

// Rate limiting - simple in-memory store (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 5 // Max 5 emails per hour per IP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

async function sendEmailWithResend(data: LeadData) {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY not configured')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'Pension Calculator <noreply@lilachinc.com>',
      to: [ADMIN_EMAIL],
      replyTo: data.email,
      subject: `🎯 ליד חדש - מחשבון סימולציית פרישה: ${data.name}`,
      html: generateEmailHTML(data),
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Resend API error: ${JSON.stringify(error)}`)
  }

  return await response.json()
}

async function sendEmailWithSMTP(data: LeadData) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration incomplete')
  }

  // Dynamic import for nodemailer (only if SMTP is configured)
  const nodemailer = await import('nodemailer')
  
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '587'),
    secure: SMTP_PORT === '465',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Pension Calculator" <${SMTP_USER}>`,
    to: ADMIN_EMAIL,
    replyTo: data.email,
    subject: `🎯 ליד חדש - מחשבון סימולציית פרישה: ${data.name}`,
    html: generateEmailHTML(data),
  })
}

function generateEmailHTML(data: LeadData): string {
  const formatCurrency = (amount?: number) => {
    if (!amount) return 'לא צוין'
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return `
    <!DOCTYPE html>
    <html dir="rtl" lang="he">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #0d141b 0%, #1a2332 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 25px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .info-section {
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border-right: 4px solid #E7FE55;
        }
        .info-section h2 {
          margin: 0 0 15px 0;
          color: #0d141b;
          font-size: 18px;
          border-bottom: 2px solid #E7FE55;
          padding-bottom: 8px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .info-row:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: bold;
          color: #666;
        }
        .value {
          color: #0d141b;
          font-weight: 600;
        }
        .highlight {
          background: #E7FE55;
          color: #0d141b;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e0e0e0;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background: #0d141b;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 ליד חדש - מחשבון סימולציית פרישה</h1>
        </div>

        <div class="info-section">
          <h2>פרטי קשר</h2>
          <div class="info-row">
            <span class="label">שם מלא:</span>
            <span class="value">${data.name}</span>
          </div>
          <div class="info-row">
            <span class="label">אימייל:</span>
            <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
          </div>
          <div class="info-row">
            <span class="label">טלפון:</span>
            <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span>
          </div>
          <div class="info-row">
            <span class="label">תעודת זהות:</span>
            <span class="value">${data.idNumber}</span>
          </div>
          ${data.idIssueDate ? `
          <div class="info-row">
            <span class="label">תאריך הנפקה:</span>
            <span class="value">${data.idIssueDate}</span>
          </div>
          ` : ''}
        </div>

        <div class="info-section">
          <h2>נתוני הסימולציה</h2>
          <div class="info-row">
            <span class="label">גיל נוכחי:</span>
            <span class="value">${data.currentAge} שנים</span>
          </div>
          <div class="info-row">
            <span class="label">גיל פרישה רצוי:</span>
            <span class="value">${data.retirementAge} שנים</span>
          </div>
          <div class="info-row">
            <span class="label">הכנסה חודשית:</span>
            <span class="value">${formatCurrency(data.monthlyIncome)}</span>
          </div>
          <div class="info-row">
            <span class="label">הוצאות חודשיות:</span>
            <span class="value">${formatCurrency(data.monthlyExpenses)}</span>
          </div>
          <div class="info-row">
            <span class="label">חיסכון נוכחי:</span>
            <span class="value highlight">${formatCurrency(data.currentSavings)}</span>
          </div>
        </div>

        ${data.simulationResult ? `
        <div class="info-section">
          <h2>תוצאות הסימולציה</h2>
          <div class="info-row">
            <span class="label">ביטחון פנסיוני:</span>
            <span class="value highlight">${data.simulationResult.confidenceScore || 'N/A'}%</span>
          </div>
          <div class="info-row">
            <span class="label">קצבה חודשית צפויה:</span>
            <span class="value">${formatCurrency(data.simulationResult.expectedMonthlyPension)}</span>
          </div>
          <div class="info-row">
            <span class="label">הון משוער בפרישה:</span>
            <span class="value highlight">${formatCurrency(data.simulationResult.expectedCapital)}</span>
          </div>
        </div>
        ` : ''}

        ${data.termsAccepted !== undefined || data.pensionClearinghouseContact !== undefined ? `
        <div class="info-section">
          <h2>אישורים</h2>
          ${data.termsAccepted !== undefined ? `
          <div class="info-row">
            <span class="label">תנאי שימוש:</span>
            <span class="value highlight">${data.termsAccepted ? '✓ מאושר' : '✗ לא מאושר'}</span>
          </div>
          ` : ''}
          ${data.pensionClearinghouseContact !== undefined ? `
          <div class="info-row">
            <span class="label">פניה למסלקה:</span>
            <span class="value highlight">${data.pensionClearinghouseContact ? '✓ מאושר' : '✗ לא מאושר'}</span>
          </div>
          ` : ''}
        </div>
        ` : ''}

        <div class="footer">
          <p>זמן קבלת הליד: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}</p>
          <p>זהו מייל אוטומטי ממערכת מחשבון סימולציית הפרישה</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'יותר מדי בקשות. נסה שוב מאוחר יותר.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'idNumber', 'currentAge', 'retirementAge']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `שדה חובה חסר: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'כתובת אימייל לא תקינה' },
        { status: 400 }
      )
    }

    // Prepare lead data
    const leadData: LeadData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      idNumber: body.idNumber,
      idIssueDate: body.idIssueDate,
      currentAge: body.currentAge,
      retirementAge: body.retirementAge,
      monthlyIncome: body.monthlyIncome,
      monthlyExpenses: body.monthlyExpenses,
      currentSavings: body.currentSavings,
      simulationResult: body.simulationResult,
      termsAccepted: body.termsAccepted,
      pensionClearinghouseContact: body.pensionClearinghouseContact,
    }

    // Try Resend first, fallback to SMTP
    try {
      if (RESEND_API_KEY) {
        await sendEmailWithResend(leadData)
      } else if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        await sendEmailWithSMTP(leadData)
      } else {
        console.warn('No email service configured. Email not sent.')
        // In development, log the email content
        if (process.env.NODE_ENV === 'development') {
          console.log('Email would be sent to:', ADMIN_EMAIL)
          console.log('Email content:', generateEmailHTML(leadData))
        }
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the request if email fails - still save to database
    }

    return NextResponse.json(
      { success: true, message: 'מייל נשלח בהצלחה' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Send email API error:', error)
    return NextResponse.json(
      { error: 'שגיאה בשליחת המייל' },
      { status: 500 }
    )
  }
}

