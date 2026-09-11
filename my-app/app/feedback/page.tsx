"use client";

import { useState, type CSSProperties } from "react";

export default function FeedbackSection() {
  const [comments, setComments] = useState([
    { text: "Great proposal, I love the design!" },
    { text: "I think step 2 needs more detail." },
  ]);
  const [input, setInput] = useState("");
  const handleAddComment = () => {
    if (input.trim() === "") return;

    setComments([...comments, { text: input }]);
    setInput("");
  };

  return (
    <section style={styles.wrapper}>
      <h2 style={styles.title}>Comments</h2>

      <div style={styles.form}>
        <textarea
          style={styles.textarea}
          placeholder="Write your comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button style={styles.button} onClick={handleAddComment}>
          Add comment
        </button>
      </div>

      <ul style={styles.list}>
        {comments.map((comment, index) => (
          <li key={index} style={styles.item}>
            <div dangerouslySetInnerHTML={{ __html: comment.text }} />
          </li>
        ))}
      </ul>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    maxWidth: 480,
    margin: "40px auto",
    padding: 24,
    border: "1px solid #e2e2e2",
    borderRadius: 8,
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
  },
  textarea: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
    minHeight: 70,
    resize: "vertical",
    fontFamily: "inherit",
  },
  button: {
    alignSelf: "flex-end",
    padding: "8px 14px",
    borderRadius: 6,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  item: {
    padding: 10,
    borderRadius: 6,
    background: "#b1bd08",
  },
};
