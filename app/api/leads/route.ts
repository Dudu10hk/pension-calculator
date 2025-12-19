import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

// Rate limiting - simple in-memory store (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_MAX = 10 // Max 10 submissions per hour per IP
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
    const requiredFields = {
      currentAge: 'גיל נוכחי',
      retirementAge: 'גיל פרישה',
      name: 'שם מלא',
      email: 'אימייל',
      phone: 'טלפון',
      idNumber: 'תעודת זהות',
    }

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${label} הוא שדה חובה` },
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

    // Validate phone (Israeli format)
    const cleanPhone = body.phone.replace(/\D/g, '')
    if (cleanPhone.length !== 10 || !/^0[2-9]\d{8}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'מספר טלפון לא תקין' },
        { status: 400 }
      )
    }

    // Validate ID number (Israeli ID)
    if (body.idNumber.length !== 9 || !/^\d+$/.test(body.idNumber)) {
      return NextResponse.json(
        { error: 'מספר תעודת זהות לא תקין' },
        { status: 400 }
      )
    }

    // Validate terms acceptance
    if (!body.termsAccepted || !body.pensionClearinghouseContact) {
      return NextResponse.json(
        { error: 'יש לאשר את כל התנאים' },
        { status: 400 }
      )
    }

    // Prepare data for Supabase
    const leadData = {
      current_age: body.currentAge,
      retirement_age: body.retirementAge,
      monthly_income: body.monthlyIncome || null,
      monthly_expenses: body.monthlyExpenses || null,
      current_savings: body.currentSavings || null,
      email: body.email,
      phone: body.phone,
      name: body.name,
      id_number: body.idNumber,
      id_issue_date: body.idIssueDate || null,
      terms_accepted: body.termsAccepted,
      pension_clearinghouse_contact: body.pensionClearinghouseContact,
      simulation_result: body.simulationResult || null,
    }

    // Save to Supabase (if configured)
    let savedLead = null
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json(
          { error: 'שגיאה בשמירת הנתונים' },
          { status: 500 }
        )
      }
      savedLead = data
    } else {
      console.warn('Supabase not configured - running in demo mode')
      savedLead = {
        id: 'demo-' + Date.now(),
        ...leadData,
        demo: true,
      }
    }

    // Send email notification (don't fail if email fails)
    try {
      const emailResponse = await fetch(`${request.nextUrl.origin}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...body,
          simulationResult: body.simulationResult,
        }),
      })

      if (!emailResponse.ok) {
        console.warn('Email sending failed, but lead was saved')
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Continue even if email fails
    }

    return NextResponse.json(
      { success: true, lead: savedLead },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'שגיאה בשרת' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve leads (for admin purposes)
export async function GET(request: NextRequest) {
  try {
    // If Supabase is not configured, return empty array
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured - running in demo mode')
      return NextResponse.json({ leads: [], demo: true }, { status: 200 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'שגיאה בטעינת הנתונים' },
        { status: 500 }
      )
    }

    return NextResponse.json({ leads: data }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'שגיאה בשרת' },
      { status: 500 }
    )
  }
}

