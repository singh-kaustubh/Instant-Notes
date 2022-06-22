import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const host = "http://localhost:80";
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/note/fetchallnotes`, {
        method: `GET`,
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.log(error);
    }
  };
  const addnote = async (title, description, tag) => {
    try {
      await fetch(`${host}/api/note/addnote`, {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };
  const deletenote = async (id) => {
    try {
      await fetch(`${host}/api/note/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };
  const editnote = async (id, title, description, tag) => {
    try {
      await fetch(`${host}/api/note/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      let newNotes = JSON.parse(JSON.stringify(notes));
      const index = newNotes.findIndex((Element) => Element._id === id);
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
