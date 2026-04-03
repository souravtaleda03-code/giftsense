import OpenAI from "openai";

export interface RecipientProfile {
  recipientName: string;
  personalityTypes: string[];
  interests: { name: string; intensity: string }[];
  pastGifts: string;
}

export interface GiftSuggestion {
  name: string;
  description: string;
  priceRange: string;
  confidenceScore: number;
}

function buildPrompt(profile: RecipientProfile): string {
  const interestsList = profile.interests
    .map((i) => `${i.name} (${i.intensity})`)
    .join(", ");

  return `You are an expert gift curator with deep knowledge of thoughtful, personalized gifting. Based on the following recipient profile, suggest 3-5 unique, creative gift ideas.

Recipient: ${profile.recipientName}
Personality traits: ${profile.personalityTypes.join(", ")}
Interests & hobbies: ${interestsList}
${profile.pastGifts ? `Past gifts (hits or misses): ${profile.pastGifts}` : ""}

Return ONLY a valid JSON array (no markdown, no code fences) with objects containing:
- "name": short gift name
- "description": 1-2 sentence description explaining why this gift fits the recipient
- "priceRange": price range string like "$30-$50"
- "confidenceScore": number 0-100 representing how well this gift matches the profile`;
}

function parseGiftSuggestions(text: string): GiftSuggestion[] {
  // Strip markdown code fences if present
  const cleaned = text.replace(/```(?:json)?\s*\n?/g, "").replace(/```\s*$/g, "").trim();
  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed)) {
    throw new Error("Response is not an array");
  }

  return parsed.map((item: Record<string, unknown>) => ({
    name: String(item.name || ""),
    description: String(item.description || ""),
    priceRange: String(item.priceRange || ""),
    confidenceScore: Math.min(100, Math.max(0, Number(item.confidenceScore) || 0)),
  }));
}

async function generateWithOpenAI(profile: RecipientProfile): Promise<GiftSuggestion[]> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = buildPrompt(profile);

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
    max_tokens: 1024,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI");

  return parseGiftSuggestions(content);
}

async function generateWithGroq(profile: RecipientProfile): Promise<GiftSuggestion[]> {
  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });
  const prompt = buildPrompt(profile);

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
    max_tokens: 1024,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("Empty response from Groq");

  return parseGiftSuggestions(content);
}

export async function generateGiftSuggestions(
  profile: RecipientProfile
): Promise<GiftSuggestion[]> {
  const provider = process.env.AI_PROVIDER || "groq";

  if (provider === "groq") {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured. Please add it to .env.local");
    }
    return generateWithGroq(profile);
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured. Please add it to .env.local");
  }
  return generateWithOpenAI(profile);
}
