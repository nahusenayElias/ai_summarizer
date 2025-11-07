import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required and must be a string' },
        { status: 400 }
      );
    }

    // Limit content length to avoid token limits
    const truncatedContent = content.slice(0, 12000);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that summarizes content concisely and accurately. 
          Provide key points and main ideas in a clear, structured way. 
          Keep the summary under 200 words while maintaining the core message and important details.
          Focus on the most important information and present it in an easy-to-read format.`
        },
        {
          role: "user",
          content: `Please summarize the following content:\n\n${truncatedContent}`
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const summary = completion.choices[0].message.content;

    if (!summary) {
      throw new Error('No summary generated');
    }

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
}