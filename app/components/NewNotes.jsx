import { Form, useActionData } from "@remix-run/react";
import newNoteStyles from "./NewNotes.css";

const NewNotes = () => {
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  const data = useActionData();

  return (
    <Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows="5" required />
      </p>
      <div className="form-actions">
        {/* <button>{isSubmitting ? "Saving..." : "Add"}</button> */}
        <button>Add</button>
      </div>
    </Form>
  );
};

export default NewNotes;

export function links() {
  return [{ rel: "stylesheet", href: newNoteStyles }];
}
