-- Create leads table for retirement planning leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  current_age INTEGER NOT NULL,
  retirement_age INTEGER NOT NULL,
  monthly_income NUMERIC,
  monthly_expenses NUMERIC,
  current_savings NUMERIC,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  name TEXT NOT NULL,
  id_number TEXT NOT NULL,
  id_issue_date TEXT,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  pension_clearinghouse_contact BOOLEAN NOT NULL DEFAULT false,
  simulation_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting leads (public can insert with validation)
-- This allows the frontend to insert leads securely with required fields
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (
    current_age IS NOT NULL AND
    retirement_age IS NOT NULL AND
    email IS NOT NULL AND
    phone IS NOT NULL AND
    name IS NOT NULL AND
    id_number IS NOT NULL AND
    terms_accepted = true AND
    pension_clearinghouse_contact = true
  );

-- Create policy for authenticated admin users to read all leads
-- Only service_role can read (for admin dashboard)
CREATE POLICY "Admin can read all leads" ON leads
  FOR SELECT
  TO service_role
  USING (true);

-- Create policy for service role (full access for admin operations)
CREATE POLICY "Service role full access" ON leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

