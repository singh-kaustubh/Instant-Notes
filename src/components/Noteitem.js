import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { uiActions } from "../store/ui-slice";
import { useDispatch } from "react-redux";
const Noteitem = (props) => {
  const dispatch = useDispatch();
  const context = useContext(noteContext);
  const { deletenote } = context;
  const { note, updatenote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ color: "black" }}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deletenote(note._id);
                dispatch(
                  uiActions.showNotification({
                    open: true,
                    message: "Note deleted successfully!",
                    type: "success",
                  })
                );
              }}
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updatenote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          <p
            className="card-text"
            style={{ color: "blue", fontStyle: "italic" }}
          >
            #{note.tag}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
