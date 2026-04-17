'use client';

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
}

const quickReplies = [
  "Comment déposer une plainte ?",
  "Demander une licence",
  "Contacter l'ARCEP",
  "Suivre mon dossier",
];

const botResponses: Record<string, string> = {
  "comment déposer une plainte ?":
    "Pour déposer une plainte, rendez-vous dans l'Espace Consommateur depuis le menu principal.",
  "demander une licence":
    "Les demandes de licence se font via l'Espace Opérateur.",
  "contacter l'arcep":
    "📞 +227 20 73 XX XX\n📧 contact@arcep.ne\n🏢 Niamey, Niger",
  "suivre mon dossier":
    "Connectez-vous à votre espace personnel pour suivre votre dossier.",
};

const getResponse = (input: string): string => {
  const key = input.toLowerCase().trim();
  for (const [k, v] of Object.entries(botResponses)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return "Merci pour votre message. Un conseiller vous répondra bientôt.";
};

const now = () =>
  new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Bonjour 👋 ! Je suis l'assistant ARCEP.",
      sender: "bot",
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: "user",
      time: now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: getResponse(text),
        sender: "bot",
        time: now(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {/* Chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] rounded-2xl border bg-white shadow-xl flex flex-col overflow-hidden">
          
          {/* Messages */}
          <ScrollArea className="h-[300px] p-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-2 ${msg.sender === "user" ? "text-right" : ""}`}>
                <div className="inline-block px-3 py-2 rounded-lg bg-gray-100">
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </ScrollArea>

          {/* Input */}
          <div className="p-2 flex gap-2 border-t">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
            />
            <Button onClick={() => send(input)}>
              <Send />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}