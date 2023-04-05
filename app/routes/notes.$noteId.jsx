import { Link } from "@remix-run/react";
import React from "react";
import styles from "../styles/note-details.css";

const NoteDetailsPage = () => {
  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>NOTE TITLE</h1>
      </header>
      <p id="note-details-content">NOTE CONTENT</p>
    </main>
  );
};

export default NoteDetailsPage;

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};
