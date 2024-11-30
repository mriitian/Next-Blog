import { connectToDb } from "@utils/database";
import Prompt from "@models/Prompt";

export const POST = async (req, res) => {
  const { prompt, userId, tag } = await req.json();

  try {
    await connectToDb();
    const newPrompt = new Prompt({
      creator: userId,
      prompt: prompt,
      tag: tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (e) {
    console.log(e);
  }
};
