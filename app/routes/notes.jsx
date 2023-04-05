import { redirect } from "@remix-run/node";
import NewNotes, { links as newNoteLinks } from "~/components/NewNotes";
import { getStoredNotes, storeNotes } from "~/data/notes";

const NotesPage = () => {
  return (
    <main>
      <NewNotes />
    </main>
  );
};

export default NotesPage;

export async function action({ request }) {
  const fromData = await request.formData();
  // const noteData = {
  //   title: fromData.get('title'),
  //   content: fromData.get('content')
  // };

  const noteData = Object.fromEntries(fromData);
  // Add validation ...

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = [...existingNotes, noteData];

  storeNotes(updatedNotes);

  return redirect("/notes");
}

// this is called surfacing the links cause you can't use links to component
export function links() {
  return [...newNoteLinks()];
}
