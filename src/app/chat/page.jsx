"use client";

import { useState } from "react";
import { askGemini } from "./actions";

export default function Home() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const answer = await askGemini(input, history);

    setHistory(prev => prev.concat({ question: input, answer }));
    setInput("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md flex flex-col border border-rose-100">

        {/* Header */}
        <div className="px-6 py-4 border-b border-rose-100 text-slate-800 font-semibold">
          AI
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {history.length === 0 && (
            <p className="text-slate-500 text-center">
              Say hi to your AI 🌸
            </p>
          )}

          {history.map((item, i) => (
            <div key={i} className="space-y-2">
              {/* You */}
              <div className="flex justify-end">
                <div className="bg-pink-300 text-slate-900 px-4 py-2 rounded-xl max-w-[75%]">
                  {item.question}
                </div>
              </div>

              {/* AI */}
              <div className="flex justify-start">
                <div className="bg-purple-200 text-slate-900 px-4 py-2 rounded-xl max-w-[75%]">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-rose-100 flex gap-2 bg-rose-50">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something soft…"
            className="flex-1 bg-white text-slate-800 placeholder-slate-400 border border-rose-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-300 hover:bg-purple-400 text-slate-900 px-5 py-2 rounded-xl disabled:opacity-50"
          >
            {loading ? "Thinking…" : "Send"}
          </button>
        </div>

      </div>
    </div>
  );
}
