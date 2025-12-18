import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.currentAge || !body.retirementAge) {
      return NextResponse.json(
        { error: 'גיל נוכחי וגיל פרישה נדרשים' },
        { status: 400 }
      )
    }

    // Validate email if provided
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'כתובת אימייל לא תקינה' },
        { status: 400 }
      )
    }

    // If Supabase is not configured, return success without saving
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured - running in demo mode')
      return NextResponse.json(
        { 
          success: true, 
          lead: { 
            id: 'demo-' + Date.now(),
            ...body,
            demo: true 
          } 
        },
        { status: 201 }
      )
    }

    // Insert lead into Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          current_age: body.currentAge,
          retirement_age: body.retirementAge,
          monthly_income: body.monthlyIncome || null,
          monthly_expenses: body.monthlyExpenses || null,
          email: body.email || null,
          phone: body.phone || null,
          name: body.name || null,
          simulation_result: body.simulationResult || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'שגיאה בשמירת הנתונים' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, lead: data },
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

