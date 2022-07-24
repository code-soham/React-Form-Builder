import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Viewform from "./pages/Viewform";
import PublicForm from "./pages/PublicForm";
import Buildform from "./pages/Buildform";
import Protected from "./utils/Protected";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
function App() {
  const [authenticated, setAuthenticated] = useState(undefined);
  const [email, setEmail] = useState(
    localStorage.getItem("formit.sessionInfo")
      ? JSON.parse(localStorage.getItem("formit.sessionInfo") || "{}").email
      : ""
  );
  const [password, setPassword] = useState(
    localStorage.getItem("formit.sessionInfo")
      ? JSON.parse(localStorage.getItem("formit.sessionInfo") || "{}").password
      : ""
  );
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            path="*"
            element={
              <Protected redirect={authenticated} path="/dashboard">
                <Login
                  setAuthenticated={setAuthenticated}
                  authenticated={authenticated}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  email={email}
                  password={password}
                />
              </Protected>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Protected redirect={!authenticated} path="/">
                <Dashboard
                  setAuthenticated={setAuthenticated}
                  authenticated={authenticated}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  email={email}
                  password={password}
                />
              </Protected>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard/buildform"
            element={
              <Protected redirect={!authenticated} path="/dashboard">
                <Buildform
                  setAuthenticated={setAuthenticated}
                  authenticated={authenticated}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  email={email}
                  password={password}
                />
              </Protected>
            }
          />
          <Route
            path="/dashboard/viewform/:id"
            element={
              <Protected redirect={!authenticated} path="/dashboard">
                <Viewform
                  setAuthenticated={setAuthenticated}
                  authenticated={authenticated}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  email={email}
                  password={password}
                />
              </Protected>
            }
          />
          <Route path="/form/:id" element={<PublicForm />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
