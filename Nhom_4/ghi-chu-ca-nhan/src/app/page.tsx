"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

export type Note = {
  id: number;
  text: string;
  time: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [mounted, setMounted] = useState(false);

  // load
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
    setMounted(true);
  }, []);

  // save (đặt trước return)
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, mounted]);

  // ✅ return sau khi gọi hết hooks
  if (!mounted) return null;

  const addNote = (text: string) => {
    const newNote: Note = {
      id: Date.now(),
      text,
      time: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="container">
      <Header count={notes.length} />
      <NoteForm onAdd={addNote} />
      <NoteList notes={notes} onDelete={deleteNote} />
    </div>
  );
}