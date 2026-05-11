import { supabase } from "../lib/supabaseClient";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_threads (*),
      project_tags(
        tags (*)
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function createProject(projectData){
  const { title, designer, status, tags, notes, threads, image_url } = projectData;
  const { data: createdProject, error: projectError } = await supabase
  .from("projects")
  .insert({
    title: title,
    designer: designer,
    status: status,
    notes: notes,
    image_url:image_url,
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
  console.log("Tags received in createProject:", tags);
  console.log("Created project id:", createdProject.id);

  await upsertTagsForProject(createdProject.id, tags);

  return createdProject;

}

export async function getProjectById(passedId){
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_threads (*),
      project_tags (
        tags (*)
      )
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
  const { title, designer, status, notes, threads, image_url } = updatedProject;

  const { data: updatedProjectRow, error: projectError } = await supabase
    .from("projects")
    .update({
      title,
      designer,
      status,
      notes,
      image_url,
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

export async function uploadProjectImage(file) {
  if(!file){
    return null;
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `projects/${fileName}`;

  const {error: uploadError} = await supabase.storage
    .from("project-images")
    .upload(filePath, file);

    if(uploadError){
      throw uploadError;
    }

    const{data} = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);
  
  return data.publicUrl;
    
}

async function upsertTagsForProject(projectId, tagNames) {
  if (!tagNames || tagNames.length === 0) {
    return;
  }

  const uniqueTagNames = [...new Set(tagNames)];

  const tagRows = uniqueTagNames.map((name) => ({ name }));

  const { data: tags, error: tagsError } = await supabase
    .from("tags")
    .upsert(tagRows, { onConflict: "name" })
    .select();

  if (tagsError) {
    throw tagsError;
  }

  const projectTagRows = tags.map((tag) => ({
    project_id: projectId,
    tag_id: tag.id,
  }));
  console.log("Tag names in helper:", tagNames);
  console.log("Project id in helper:", projectId);

  const { error: projectTagsError } = await supabase
    .from("project_tags")
    .insert(projectTagRows);

  if (projectTagsError) {
    throw projectTagsError;
  }
}

