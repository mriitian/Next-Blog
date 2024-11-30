import { connectToDb } from "@utils/database";
import Blog from "@models/Blog"; // Assuming Blog is the model for blog posts

export const POST = async (req, res) => {
  const { title, description, content, userId, tags } = await req.json();

  try {
    await connectToDb();

    // Create a new blog post
    const newBlog = new Blog({
      creator: userId,
      title: title,
      description: description,
      content: content,
      tags: tags,
    });

    // Save the new blog to the database
    await newBlog.save();

    // Return a response with the new blog data
    return new Response(JSON.stringify(newBlog), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Error creating blog post", { status: 500 });
  }
};
