import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader2, Terminal } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AgentModule() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'AI Investigation Agent initialized. I have access to OSINT Industries, Epieos, Pipl, and other open-source intelligence tools. How can I assist your investigation today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I am currently running a simulated investigation on your query: "${userMessage.content}".\n\n> Initializing OSINT Industries API...\n> Querying Epieos for digital footprints...\n> Cross-referencing with public records...\n\nThis is a mock response. In a production environment, this agent would execute real queries against configured OSINT APIs and return actionable intelligence.`
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      <div className="p-6 border-b border-zinc-900 flex items-center gap-3 bg-zinc-900/30">
        <div className="w-10 h-10 rounded bg-purple-950 border border-purple-900 flex items-center justify-center">
          <Bot className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h2 className="text-zinc-100 font-bold tracking-tight text-lg">AI INVESTIGATION AGENT</h2>
          <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">Automated OSINT Workflows</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-purple-900/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-sm' 
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-bl-sm font-mono text-sm leading-relaxed whitespace-pre-wrap'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-900/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-purple-900/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-1">
                <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-sm px-5 py-3.5 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-500 animate-pulse" />
                <span className="text-sm font-mono text-zinc-500">Executing OSINT queries...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-zinc-900 bg-zinc-950">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter an email, phone number, username, or IP address to investigate..."
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-zinc-600"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="text-center mt-2 text-[10px] font-mono text-zinc-600">
          Agent has access to: OSINT Industries, Epieos, Pipl, Shodan, and public records databases.
        </div>
      </div>
    </div>
  );
}
