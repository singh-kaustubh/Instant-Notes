import React, { useEffect } from "react";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
const Notification = ({ type, message }) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const handleClose = () => {
    dispatch(
      uiActions.showNotification({
        open: false,
      })
    );
  };
  const autoDismiss = () => {
    setTimeout(() => {
      dispatch(
        uiActions.showNotification({
          open: false,
        })
      );
    }, 2000);
  };

  useEffect(() => {
    autoDismiss();
    // eslint-disable-next-line
  }, [notification.open]);

  return (
    <div>
      {notification.open && (
        <Alert variant="filled" onClose={handleClose} severity={type}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
