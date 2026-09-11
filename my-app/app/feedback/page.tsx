"use client";

import { useEffect, useState } from "react";

interface FeedbackItem {
  id: number;
  text: string;
}

export default function FeedbackPage() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [text, setText] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function addItem() {
    setItems([...items, { id: items.length, text }]);
    setText("");
  }

  async function loadPreview() {
    const res = await fetch(previewUrl);
    const html = await res.text();
    setPreviewHtml(html);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Feedback</h1>
      <p>Seconds elapsed: {count}</p>

      <div className="mt-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave feedback"
          className="border px-2 py-1"
        />
        <button onClick={addItem} className="bg-black text-white px-3 py-1">
          Add
        </button>
      </div>

      <ul className="mt-4">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between">
            {item.text}
            <button
              onClick={() => setItems(items.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <input
          value={previewUrl}
          onChange={(e) => setPreviewUrl(e.target.value)}
          placeholder="URL to preview"
          className="border px-2 py-1"
        />
        <button
          onClick={loadPreview}
          className="ml-2 bg-black text-white px-3 py-1"
        >
          Load preview
        </button>
        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </div>
    </div>
  );
}
