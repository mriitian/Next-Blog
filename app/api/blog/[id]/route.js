import Blog from "@models/Blog"; // Assuming Blog is the model for blog posts
import { connectToDb } from "@utils/database";

// GET - Retrieve a single blog post by ID
export const GET = async (request, { params }) => {
  try {
    // Ensure params is awaited
    const { id } = await params;

    await connectToDb();

    // Fetch the blog post by ID and populate the creator details
    const blog = await Blog.findById(id).populate("creator");
    if (!blog) return new Response("Blog Not Found", { status: 404 });

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

// PATCH - Update a blog post by ID
export const PATCH = async (request, { params }) => {
  const { title, description, content, tags } = await request.json();

  try {
    // Ensure params is awaited
    const { id } = await params;

    await connectToDb();

    // Find the existing blog post by ID
    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return new Response("Blog not found", { status: 404 });
    }

    // Update the blog post with new data
    existingBlog.title = title;
    existingBlog.description = description;
    existingBlog.content = content;
    existingBlog.tags = tags;

    await existingBlog.save();

    return new Response("Successfully updated the Blog", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Blog", { status: 500 });
  }
};

// DELETE - Delete a blog post by ID
export const DELETE = async (request, { params }) => {
  try {
    // Ensure params is awaited
    const { id } = await params;

    await connectToDb();

    // Find the blog post by ID and delete it
    await Blog.findByIdAndDelete(id);

    return new Response("Blog deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
};
