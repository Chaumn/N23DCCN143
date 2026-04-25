import { Note } from "../app/page";

export default function NoteList({
  notes,
  onDelete,
}: {
  notes: Note[];
  onDelete: (id: number) => void;
}) {
  return (
    <div className="list">
      {notes.map((note) => (
        <div key={note.id} className="note">
          <div>
            <p>{note.text}</p>
            <small>{note.time}</small>
          </div>
          <button onClick={() => onDelete(note.id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
}