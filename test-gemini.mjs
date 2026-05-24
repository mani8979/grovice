import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No API key found");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Respond with exactly: 'API key is working!'");
    const response = await result.response;
    console.log("Success:", response.text());
  } catch (err) {
    console.error("Error calling Gemini API:", err);
  }
}

test();
