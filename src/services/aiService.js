import OpenAI from "openai";

export async function analyzeResumeWithAI(resumeText) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const prompt = `You are an expert ATS...

${resumeText}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "Return ONLY JSON" },
        { role: "user", content: prompt },
      ],
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error(err);
    throw err;
  }
}