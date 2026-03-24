import { useState } from "react";
import { SELLERS, INITIAL_MESSAGES } from "../data/listings";
import { Avatar } from "../components/ui";

export default function ChatScreen({ sellerId, onBack }) {
  const seller = SELLERS[sellerId];
  const [messages, setMessages] = useState(INITIAL_MESSAGES[sellerId] || []);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", text: input.trim(), time },
    ]);
    setInput("");

    // Simulate a reply after 1.2s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "them",
          text: "Thanks for reaching out! I'll get back to you shortly.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1200);
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <button className="chat-back" onClick={onBack}>
          ←
        </button>
        <Avatar name={seller.name} size={36} />
        <span style={{ fontWeight: 600, fontSize: 15 }}>{seller.name}</span>
      </div>

      <div className="chat-messages">
        {messages.map((m) => (
          <div key={m.id} className={`message-bubble ${m.from}`}>
            {m.text}
            <div className="message-time">{m.time}</div>
          </div>
        ))}
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          className="btn btn-primary"
          style={{ padding: "12px 24px" }}
          onClick={send}
        >
          Send
        </button>
      </div>
    </div>
  );
}
