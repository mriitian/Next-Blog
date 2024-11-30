import Blog from "@models/Blog";
import { connectToDb } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDb();

    // Access `params` correctly
    const { id } = await params; // Ensure `params` is awaited

    const blogs = await Blog.find({ creator: id }).populate("creator");

    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response("Failed to fetch blogs created by user", {
      status: 500,
    });
  }
};
