import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import LoggedInRoute from "./LoggedInRoute";
import Profile from "./Profile";
import Forum from "./Forum";
import Semesters from "./Semesters";
import Semester from "./Semester";
import SubjectPage from "./SubjectPage";
import Chat from "./Chat";
import "../styles/styles.css";
import Navbar from "./Navbar";
import Messenger from "./Messenger";

function App() {
  return (
    <
      // className="d-flex align-items-center justify-content-center"
      // style={{ minHeight: "100vh" }}
    >
      <div>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                exact
                path="/seminarska-project"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/seminarska-project/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/seminarska-project/profile/:id"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route
                path="/seminarska-project/profile/:id/message"
                element={
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                }
              />

              <Route
                path="/seminarska-project/messenger/:id"
                element={
                  <PrivateRoute>
                    <Messenger />
                  </PrivateRoute>
                }
              />

              <Route
                path="/seminarska-project/messenger/:id/:id"
                element={
                  <PrivateRoute>
                    <Messenger />
                  </PrivateRoute>
                }
              />

              <Route
                path="/seminarska-project/forum"
                element={
                  <PrivateRoute>
                    <Forum />
                  </PrivateRoute>
                }
              />
              <Route
                path="/seminarska-project/semesters"
                element={
                  <PrivateRoute>
                    <Semesters />
                  </PrivateRoute>
                }
              />
              {/* <Route
                path="/semesters/semester1"
                element={
                  <PrivateRoute>
                    <Semester />
                  </PrivateRoute>
                }
              /> */}
              <Route
                path="/seminarska-project/semesters/semester/:id"
                element={
                  <PrivateRoute>
                    <Semester />
                  </PrivateRoute>
                }
              />
              {/* <Route
                path="/semesters/semester3"
                element={
                  <PrivateRoute>
                    <Semester />
                  </PrivateRoute>
                }
              />
              <Route
                path="/semesters/semester4"
                element={
                  <PrivateRoute>
                    <Semester />
                  </PrivateRoute>
                }
              />
              <Route
                path="/semesters/semester5"
                element={
                  <PrivateRoute>
                    <Semester />
                  </PrivateRoute>
                }
              />
              <Route
                path="/semesters/semester6"
                element={
                  <PrivateRoute>
                    <Semester />
                  </PrivateRoute>
                }
              />
              <Route
                path="/semesters/semester7"
                element={
                  <PrivateRoute>
                    <Semester />
                  </PrivateRoute>
                }
              />
              <Route
                path="/semesters/semester8"
                element={
                  <PrivateRoute>
                    <Semester />
                  </PrivateRoute>
                }
              /> */}

              <Route
                path={"/seminarska-project/semesters/semester/:id/subject/:id"}
                element={
                  <PrivateRoute>
                    <SubjectPage />
                  </PrivateRoute>
                }
              />
              {/* <Route
                path={"/semesters/semester2/subject"}
                element={
                  <PrivateRoute>
                    <SubjectPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={"/semesters/semester3/subject"}
                element={
                  <PrivateRoute>
                    <SubjectPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={"/semesters/semester4/subject"}
                element={
                  <PrivateRoute>
                    <SubjectPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={"/semesters/semester5/subject"}
                element={
                  <PrivateRoute>
                    <SubjectPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={"/semesters/semester6/subject"}
                element={
                  <PrivateRoute>
                    <SubjectPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={"/semesters/semester7/subject"}
                element={
                  <PrivateRoute>
                    <SubjectPage />
                  </PrivateRoute>
                }
              />
              <Route
                path={"/semesters/semester8/subject"}
                element={
                  <PrivateRoute>
                    <SubjectPage />
                  </PrivateRoute>
                }
              /> */}

              <Route
                path="/seminarska-project/signup"
                element={
                  <LoggedInRoute>
                    <Signup />
                  </LoggedInRoute>
                }
              />
              <Route
                path="/seminarska-project/login"
                element={
                  <LoggedInRoute>
                    <Login />
                  </LoggedInRoute>
                }
              />
              <Route
                path="/seminarska-project/forgot-password"
                element={
                  <LoggedInRoute>
                    <ForgotPassword />
                  </LoggedInRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
