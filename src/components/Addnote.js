import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import noteContext from "../context/notes/noteContext";
import { uiActions } from "../store/ui-slice";
export default function Addnote() {
  const dispatch = useDispatch();
  const context = useContext(noteContext);
  const { addnote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    let dtag;
    dtag = note.tag.length ? note.tag : "default";
    addnote(note.title, note.description, dtag);
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "Note added successfully!",
        type: "success",
      })
    );
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h2 className="text-center">Welcome to Instant Notes⚡</h2>
        <form className="my-3" onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              rows={10}
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              aria-describedby="emailHelp"
              value={note.tag}
              onChange={onChange}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-dark">
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
