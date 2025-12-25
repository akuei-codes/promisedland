-- Create enum for application status
CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected');

-- Create programs table
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  learning_outcomes TEXT[] NOT NULL DEFAULT '{}',
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  gender TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  program_id UUID NOT NULL REFERENCES public.programs(id),
  education_background TEXT NOT NULL,
  additional_info TEXT,
  status application_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin users table (for role-based access)
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Create site settings table for admission dates etc
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'admin'
  )
$$;

-- Programs RLS - Public read, admin write
CREATE POLICY "Anyone can view programs" ON public.programs
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage programs" ON public.programs
  FOR ALL USING (public.is_admin(auth.uid()));

-- Announcements RLS - Public read published, admin write
CREATE POLICY "Anyone can view published announcements" ON public.announcements
  FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage announcements" ON public.announcements
  FOR ALL USING (public.is_admin(auth.uid()));

-- Applications RLS - Public insert, admin read/write
CREATE POLICY "Anyone can submit applications" ON public.applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage applications" ON public.applications
  FOR ALL USING (public.is_admin(auth.uid()));

-- Contact messages RLS - Public insert, admin read
CREATE POLICY "Anyone can send messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view messages" ON public.contact_messages
  FOR ALL USING (public.is_admin(auth.uid()));

-- User roles RLS - Admin only
CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT USING (public.is_admin(auth.uid()));

-- Site settings RLS - Public read, admin write
CREATE POLICY "Anyone can view settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage settings" ON public.site_settings
  FOR ALL USING (public.is_admin(auth.uid()));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON public.programs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial programs
INSERT INTO public.programs (name, description, duration, learning_outcomes, icon) VALUES
  ('Computer Basics', 'Master essential computer skills including operating systems, file management, and productivity software. Perfect for beginners entering the digital world.', '3 months', ARRAY['Understand computer hardware and software fundamentals', 'Navigate operating systems confidently', 'Use productivity tools like word processors and spreadsheets', 'Manage files and folders effectively'], 'Monitor'),
  ('English Language', 'Develop strong English communication skills for academic and professional success. Focus on reading, writing, speaking, and listening.', '6 months', ARRAY['Communicate effectively in English', 'Write professional documents and emails', 'Improve vocabulary and grammar', 'Build confidence in public speaking'], 'Languages'),
  ('Web Development', 'Learn to build modern, responsive websites using HTML, CSS, JavaScript, and popular frameworks. Create your portfolio of real projects.', '6 months', ARRAY['Build responsive websites from scratch', 'Master HTML, CSS, and JavaScript', 'Work with modern frameworks and tools', 'Deploy websites to the internet'], 'Code'),
  ('Entrepreneurship', 'Transform your business ideas into reality. Learn business planning, marketing, financial management, and how to launch successful ventures.', '4 months', ARRAY['Develop viable business plans', 'Understand market research and analysis', 'Master basic financial management', 'Create effective marketing strategies'], 'Lightbulb'),
  ('Leadership and Communication', 'Build essential leadership skills and become an effective communicator. Perfect for aspiring managers and team leaders.', '3 months', ARRAY['Lead teams effectively', 'Communicate with confidence', 'Resolve conflicts professionally', 'Inspire and motivate others'], 'Users'),
  ('Project Management', 'Learn industry-standard project management methodologies. Plan, execute, and deliver projects on time and within budget.', '4 months', ARRAY['Plan and organize projects effectively', 'Manage resources and timelines', 'Use project management tools', 'Lead project teams to success'], 'ClipboardList'),
  ('Teachers Training', 'Prepare for a rewarding career in education. Learn modern teaching methods, classroom management, and curriculum development.', '6 months', ARRAY['Design effective lesson plans', 'Manage classrooms professionally', 'Assess student learning outcomes', 'Use technology in education'], 'GraduationCap'),
  ('Digital Marketing & E-Commerce', 'Master online marketing strategies and learn to build successful e-commerce businesses. From social media to SEO.', '4 months', ARRAY['Create digital marketing campaigns', 'Manage social media effectively', 'Understand SEO and analytics', 'Set up and run online stores'], 'ShoppingCart'),
  ('Career and Personal Development', 'Unlock your potential with skills for personal growth and career advancement. Build confidence, set goals, and achieve success.', '2 months', ARRAY['Set and achieve meaningful goals', 'Build self-confidence and resilience', 'Develop professional networking skills', 'Create a personal development plan'], 'TrendingUp'),
  ('Interview Preparation', 'Ace your next job interview with proven techniques. Learn to present yourself confidently and answer tough questions.', '1 month', ARRAY['Prepare compelling interview responses', 'Present yourself professionally', 'Handle difficult interview questions', 'Follow up effectively after interviews'], 'Briefcase');

-- Insert initial site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('admission_start_date', 'January 2026'),
  ('application_deadline', 'December 31, 2025'),
  ('admission_notice', 'Applications are now open for the January 2026 intake!');