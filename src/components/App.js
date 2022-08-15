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

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100">
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route
                path="/message"
                element={
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                }
              />

              <Route
                path="/forum"
                element={
                  <PrivateRoute>
                    <Forum />
                  </PrivateRoute>
                }
              />
              <Route
                path="/semesters"
                element={
                  <PrivateRoute>
                    <Semesters />
                  </PrivateRoute>
                }
              />
              <Route
                path="/semesters/semester"
                element={
                  <PrivateRoute>
                    <Semester />
                  </PrivateRoute>
                }
              />

              <Route
                path="/semesters/semester/subject"
                element={
                  <PrivateRoute>
                    <SubjectPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/signup"
                element={
                  <LoggedInRoute>
                    <Signup />
                  </LoggedInRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <LoggedInRoute>
                    <Login />
                  </LoggedInRoute>
                }
              />
              <Route
                path="/forgot-password"
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
    </Container>
  );
}

export default App;
