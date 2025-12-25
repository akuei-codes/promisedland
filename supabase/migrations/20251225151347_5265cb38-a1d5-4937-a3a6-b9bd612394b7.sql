-- Add reply columns to contact_messages table
ALTER TABLE public.contact_messages 
ADD COLUMN admin_reply text,
ADD COLUMN replied_at timestamp with time zone;