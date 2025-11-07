'use client';
import { useState } from 'react';
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: input }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }
      
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setInput('');
    setSummary('');
    setError('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-16 px-8 bg-white dark:bg-black sm:items-start">
        {/* Header */}
        <div className="w-full text-center mb-8">
          <Image
            className="dark:invert mx-auto mb-4"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-2">
            SummifyAI
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Transform lengthy content into clear, concise summaries
          </p>
        </div>

        {/* Main Content */}
        <div className="w-full flex-1 flex flex-col items-center gap-8">
          <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <div className="mb-4">
                <label 
                  htmlFor="content" 
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Content to Summarize
                </label>
                <textarea
                  id="content"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your article, blog post, documentation, or any text content here..."
                  className="w-full h-64 p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating Summary...
                    </>
                  ) : (
                    'Summarize Content'
                  )}
                </button>
                
                {(input || summary) && (
                  <button
                    type="button"
                    onClick={clearAll}
                    disabled={loading}
                    className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition duration-200 disabled:opacity-50"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="w-full max-w-2xl p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          {/* Summary Output */}
          {summary && (
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-black dark:text-zinc-50">
                  Summary
                </h2>
                <button
                  onClick={() => navigator.clipboard.writeText(summary)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition duration-200"
                >
                  Copy to Clipboard
                </button>
              </div>
              <div className="prose max-w-none dark:prose-invert">
                <div className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {summary}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}