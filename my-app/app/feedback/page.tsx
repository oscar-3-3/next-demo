"use client";

import { useState } from "react";

interface Comment {
  text: string;
}

export default function FeedbackSection() {
  const [comments, setComments] = useState<Comment[]>([
    { text: "Great proposal, I love the design!" },
    { text: "I think step 2 needs more detail." },
  ]);
  const [input, setInput] = useState("");
  const handleAddComment = () => {
    if (input.trim() === "") return;

    setComments([...comments, { text: input }]);
    setInput("");
  };
  const handleRemoveComment = (index: number) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  return (
    <section className="max-w-[800px] my-10 mx-auto p-6 border border-[#e2e2e2] rounded-lg font-sans">
      <h2 className="text-xl mb-4">Comments</h2>

      <div className="flex flex-col gap-2 mb-5">
        <textarea
          className="p-2 rounded-md border border-[#ccc] min-h-[70px] resize-y font-[inherit]"
          placeholder="Write your comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="self-end px-3.5 py-2 rounded-md border-none bg-blue-600 text-white cursor-pointer"
          onClick={handleAddComment}
        >
          Add comment
        </button>
      </div>

      <ul className="list-none p-0 flex flex-col gap-2.5">
        {[...comments].reverse().map((comment, index) => (
          <li key={index} className="p-2.5 rounded-md bg-[#b1bd08]">
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
            <button
              className="mt-2 px-2.5 py-1 rounded-md border-none bg-red-600 text-white cursor-pointer"
              onClick={() => handleRemoveComment(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
