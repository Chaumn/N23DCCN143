"use client";

import { useState } from "react";

export default function NoteForm({
  onAdd,
}: {
  onAdd: (text: string) => void;
}) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <div className="form">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập ghi chú mới..."
      />
      <button onClick={handleAdd}>+ Thêm</button>
    </div>
  );
}