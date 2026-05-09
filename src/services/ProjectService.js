import { supabase } from "../lib/supabaseClient";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_threads (*)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}