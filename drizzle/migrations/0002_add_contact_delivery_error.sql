ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS delivery_error text;