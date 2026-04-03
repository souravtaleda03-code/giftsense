import { NextResponse } from "next/server";
import { generateGiftSuggestions, type RecipientProfile } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { recipientName, personalityTypes, interests, pastGifts } = body as RecipientProfile;

    // Validate input
    if (
      !recipientName ||
      !Array.isArray(personalityTypes) ||
      personalityTypes.length === 0 ||
      !Array.isArray(interests) ||
      interests.length === 0
    ) {
      return NextResponse.json(
        { error: "Please provide at least one personality type and one interest." },
        { status: 400 }
      );
    }

    const profile: RecipientProfile = {
      recipientName: String(recipientName).slice(0, 100),
      personalityTypes: personalityTypes.map((t) => String(t).slice(0, 50)).slice(0, 10),
      interests: interests
        .map((i) => ({
          name: String(i.name).slice(0, 100),
          intensity: String(i.intensity).slice(0, 50),
        }))
        .slice(0, 20),
      pastGifts: String(pastGifts || "").slice(0, 500),
    };

    const suggestions = await generateGiftSuggestions(profile);

    return NextResponse.json({ suggestions });
  } catch (err: unknown) {
    console.error("Gift generation error:", err);
    const message = err instanceof Error ? err.message : "An unexpected error occurred";

    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
