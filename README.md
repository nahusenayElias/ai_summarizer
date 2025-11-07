 # SummifyAI - AI Content Summarizer

A modern web application that uses AI to generate concise summaries of lengthy text content.

## Features

- 🤖 AI-powered text summarization
- 🎨 Clean, modern UI with dark/light mode
- 📱 Fully responsive design
- 📋 Copy to clipboard functionality
- ⚡ Real-time processing with loading states
- 🛡️ Comprehensive error handling

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-3.5-turbo

## Quick Start

### Prerequisites
- Node.js 18.x or later
- OpenAI API key

### Installation

1. **Create and setup project:**
```bash
npx create-next-app@latest summify-ai --typescript --tailwind --eslint
cd summify-ai
npm install openai

2.  **Environment varibales:**

OPENAI_API_KEY=your_openai_api_key_here

3. **Get OpenAI API key:**

        Visit OpenAI Platform

        Create account and get API key

        Add to .env.local

4. **Replace default content:**

        Copy the provided page.tsx to app/page.tsx

        Copy the provided route.ts to app/api/summarize/route.ts

5. **Run the development server:**

# Start production server
npm run dev

# Run linting
npm run lint
