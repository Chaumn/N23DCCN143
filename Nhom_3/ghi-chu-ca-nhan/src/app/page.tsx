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

  // load localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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