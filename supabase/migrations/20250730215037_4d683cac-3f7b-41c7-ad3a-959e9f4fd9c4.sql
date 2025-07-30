-- Phase 1: Critical Database Security Fixes

-- First, create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get current user profile
CREATE OR REPLACE FUNCTION public.get_current_user_profile()
RETURNS UUID
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT id FROM public.profiles WHERE id = auth.uid();
$$;

-- Create profiles RLS policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Enable RLS on existing tables
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.followup_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.n8n_chat_histories ENABLE ROW LEVEL SECURITY;

-- Add user_id column to chat_logs if not exists (for proper RLS)
ALTER TABLE public.chat_logs 
ADD COLUMN IF NOT EXISTS authenticated_user_id UUID REFERENCES auth.users(id);

-- Create RLS policies for chat_logs (session-based access)
CREATE POLICY "Users can view their own chat logs"
  ON public.chat_logs
  FOR SELECT
  USING (
    user_id = auth.uid()::text OR 
    authenticated_user_id = auth.uid() OR
    auth.uid() IS NULL -- Allow anonymous access for now during transition
  );

CREATE POLICY "Users can insert their own chat logs"
  ON public.chat_logs
  FOR INSERT
  WITH CHECK (
    user_id = auth.uid()::text OR 
    authenticated_user_id = auth.uid() OR
    auth.uid() IS NULL -- Allow anonymous access for now during transition
  );

-- Create RLS policies for documents (user-based access)
CREATE POLICY "Authenticated users can view documents"
  ON public.documents
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert documents"
  ON public.documents
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add user_id to followup_logs if not exists
ALTER TABLE public.followup_logs
ADD COLUMN IF NOT EXISTS authenticated_user_id UUID REFERENCES auth.users(id);

-- Create RLS policies for followup_logs (user-specific access)
CREATE POLICY "Users can view their own followup logs"
  ON public.followup_logs
  FOR SELECT
  USING (
    user_id = auth.uid()::text OR 
    authenticated_user_id = auth.uid()
  );

CREATE POLICY "Users can insert their own followup logs"
  ON public.followup_logs
  FOR INSERT
  WITH CHECK (
    user_id = auth.uid()::text OR 
    authenticated_user_id = auth.uid()
  );

-- Create RLS policies for n8n_chat_histories (session-based access)
CREATE POLICY "Users can view chat histories"
  ON public.n8n_chat_histories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert chat histories"
  ON public.n8n_chat_histories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();