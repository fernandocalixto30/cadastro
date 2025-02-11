import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://sxabbfdkfapzrbhmnjnd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4YWJiZmRrZmFwenJiaG1uam5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyOTcyOTEsImV4cCI6MjA1NDg3MzI5MX0.Vesj7WP8MY4iW1zi9AG-9BqyZbZQXeJQgvxMgvLlJ_Y";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
