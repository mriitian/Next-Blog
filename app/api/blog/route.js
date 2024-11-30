import { connectToDb } from "@utils/database";
import Blog from "@models/Blog";
export const dynamic = "force-dynamic";
export const GET = async (req) => {
  try {
    await connectToDb();
    console.log("Database connected successfully");
    const blogs = await Blog.find({}).populate("creator");
    console.log("Fetched blogs:", blogs);
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
