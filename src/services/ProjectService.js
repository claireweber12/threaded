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

export async function createProject(projectData){
  const { title, designer, status, notes, threads } = projectData;
  const { data: createdProject, error: projectError } = await supabase
  .from("projects")
  .insert({
    title: title,
    designer: designer,
    status: status,
    notes: notes,
  })
  .select()
  .single();

  if (projectError){
    throw projectError;
  }
  const threadRows = (threads || []).map((thread) => ({
    project_id: createdProject.id,
    brand: thread.brand,
    color_number: thread.colorNumber,
    color_name: thread.colorName,
    color_hex: thread.colorHex,
  }));

  if (threadRows.length > 0) {
    const { error: threadError } = await supabase
      .from("project_threads")
      .insert(threadRows);

    if (threadError) {
      throw threadError;
    }
  }

  return createdProject;

}

export async function getProjectById(passedId){
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_threads (*)
    `)
    .eq("id", passedId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteProject(id){
  const {error} = await supabase
  .from("projects")
  .delete()
  .eq("id", id);

  if (error){
    throw error;
  }
}

export async function updateProject(id, updatedProject) {
  const { title, designer, status, notes, threads } = updatedProject;

  const { data: updatedProjectRow, error: projectError } = await supabase
    .from("projects")
    .update({
      title,
      designer,
      status,
      notes,
    })
    .eq("id", id)
    .select()
    .single();

  if (projectError) {
    throw projectError;
  }

  const { error: deleteThreadsError } = await supabase
    .from("project_threads")
    .delete()
    .eq("project_id", id);

  if (deleteThreadsError) {
    throw deleteThreadsError;
  }

  const threadRows = (threads || []).map((thread) => ({
    project_id: id,
    brand: thread.brand,
    color_number: thread.colorNumber,
    color_name: thread.colorName,
    color_hex: thread.colorHex,
  }));

  if (threadRows.length > 0) {
    const { error: insertThreadsError } = await supabase
      .from("project_threads")
      .insert(threadRows);

    if (insertThreadsError) {
      throw insertThreadsError;
    }
  }

  return updatedProjectRow;
}

