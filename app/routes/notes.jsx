import { json, redirect } from "@remix-run/node";
import NewNotes, { links as newNoteLinks } from "~/components/NewNotes";

import { getStoredNotes, storeNotes } from "~/data/notes";
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { Outlet, useActionData, useLoaderData } from "@remix-run/react";

const NotesPage = () => {
  const notes = useLoaderData();

  return (
    <main>
      <NewNotes />
      <NoteList notes={notes} />
    </main>
  );
};

export default NotesPage;

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
  // return new Response(JSON.stringify(notes), {
  //   headers: {
  //     "content-type": "application/json",
  //   },
  // });

  // return json(notes); // remix will to that by default
}

export async function action({ request }) {
  const fromData = await request.formData();
  // const noteData = {
  //   title: fromData.get('title'),
  //   content: fromData.get('content')
  // };

  const noteData = Object.fromEntries(fromData);
  // Add validation ...
  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be at least 5 characters long." };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...existingNotes, noteData];

  storeNotes(updatedNotes);

  return redirect("/notes");
}

// this is called surfacing the links cause you can't use links to component
export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}
