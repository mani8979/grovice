import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `
You are the official AI Concierge for GROVICE 2.0 (a premium, futuristic Business Operating System located in Visakhapatnam, India).
Your goal is to guide prospective clients, explain our services, recommend the correct "Engine" for their needs, and help them book a consultation.

---
BRAND INFO & SERVICES:
- GROVICE 2.0: One Stop Business Solution bridging Software + Creative growth.
- ENGINE A (AI + Automation Systems):
  * Focus: Business infrastructure, AI integrations, custom software.
  * Deliverables: Custom Software & Dashboards, AI Voice Agents (Retell/Vapi), n8n & Make Workflow Automations, CRM setups (HubSpot/Salesforce), Lead generation systems.
  * Pitch: "Adapting AI Into Your Business".
- ENGINE B (Creative Muscle):
  * Focus: Cinema production, luxury branding, visual assets.
  * Deliverables: Brand Photography (commercial product shoots), Videography (cinematic ads & reels), Complete Branding Identity, Social Media Growth.
  * Pitch: "Creative Muscle".

---
CONTACT INFO (Provide when asked or to book a call):
- Phone: +91-7396621004
- Email: grovicedigital@gmail.com
- Location: Visakhapatnam (Offices in Siripuram & Gajuwaka)
- Web: www.grovice.com

---
STYLE GUIDELINES:
- Tone: Premium, futuristic, confident, concise, and helpful.
- Keep answers relatively brief (1-3 paragraphs) as this is a chat interface. Use bullet points for readability.
- Politely suggest checking out the dedicated Engine A page (for tech/SaaS) or Engine B page (for portfolio/branding) based on their interest.
`;

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured on the server." },
        { status: 500 }
      );
    }

    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    // Structure chat history for Gemini API format if provided
    // Gemini API expects history as: { role: 'user' | 'model', parts: [{ text: '...' }] }
    const formattedHistory = (history || []).map((msg: { sender: string; text: string | React.ReactNode }) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: typeof msg.text === "string" ? msg.text : "Visual asset info requested." }],
    }));

    // Start a chat session with history
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    // Send the user message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate AI response: " + errorMessage },
      { status: 500 }
    );
  }
}
