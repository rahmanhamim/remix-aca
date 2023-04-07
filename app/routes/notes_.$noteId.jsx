import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import styles from "../styles/note-details.css";
import { getStoredNotes } from "../data/notes";

/**
 * @description notes_.$noteId.jsx for totally new dynamic route
 * @if want to use same layout have to use <Outlet /> in parent and omit _ before _.$noteId.jsx
 */

const NoteDetailsPage = () => {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
};

export default NoteDetailsPage;

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export async function loader({ params }) {
  const { noteId } = params;
  const notes = await getStoredNotes();
  const note = notes.find((note) => note.id === noteId);
  return note;
}
