import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hyibtsuurbgfvvyfxutb.supabase.co";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://hyibtsuurbgfvvyfxutb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5aWJ0c3V1cmJnZnZ2eWZ4dXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE0NjE3MjksImV4cCI6MjAyNzAzNzcyOX0.9z9PSY95HwlNhA0BtHEKjfNG5bNkHT4N3GI-gQAX_Mk"
);

export default supabase;
