import { connectToDb } from "@utils/database";
import Prompt from "@models/Prompt";
export const dynamic = 'force-dynamic';
export const GET = async (req) => {
    try {
        await connectToDb();
        console.log("Database connected successfully");
        const prompts = await Prompt.find({}).populate('creator');
        console.log("Fetched prompts:", prompts);
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error)
    }
}