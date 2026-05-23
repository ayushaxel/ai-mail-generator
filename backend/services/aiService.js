import { Groq } from "groq-sdk/client.js";
import dotenv from "dotenv"
dotenv.config()
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateEmail = async ({ purpose, keyPoints, tone = "Professional" }) => {
  const pointsText = keyPoints.map((p) => `-${p}`).join("/n");
  const prompt = `write a professional email.
    
Purpose: ${purpose}
Tone: ${tone}

Important Points to Include:
${pointsText}

Return exactly in this format:

Subject: [Write a strong subject line]

Body:
[Complete email body with greeting like "Dear Sir/Madam" or "Hi Team", paragraphs, and closing like "Best regards"]`;


const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
  })

  const text = completion.choices[0].message.content

  const subjectMatch = text.match(/Subject:\s*(.+?)(?:\n|$)/i);
  const subject = subjectMatch ? subjectMatch[1].trim() : "Important Email"

  const body = text.replace(/Subject:.+?\n/i, "").trim()
  return { subject, body }

}
export default generateEmail
