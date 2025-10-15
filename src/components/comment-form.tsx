"use client";
import { useState } from "react";

export default function CommentForm({ postId }: { postId: string }) {
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Processing...");

    const apiUrl = process.env.NEXT_PUBLIC_COMMENT_API_URL || "/api/comments";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment, postId }),
      });

      if (response.ok) {
        setStatus("Comment posted!");
        setComment("");
      } else {
        setStatus("Comment rejected");
      }
    } catch {
      setStatus("Error posting comment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment..."
        required
      />
      <button type="submit">Post Comment</button>
      {status && <p>{status}</p>}
    </form>
  );
}
