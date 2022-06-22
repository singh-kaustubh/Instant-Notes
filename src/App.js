import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import NoteState from "./context/notes/NoteState";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Userinfo from "./components/Userinfo";
function App() {
  const notification = useSelector((state) => state.ui.notification);
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/userinfo" element={<Userinfo />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
