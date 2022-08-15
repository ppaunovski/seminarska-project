import React, { useState } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "./Navigation";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const { profile } = location.state;

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to Log Out!");
    }
  }

  return (
    <>
      <Navigation />
      {currentUser.email === profile ? (
        <>
          <Card style={{ maxWidth: "400px" }}>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <strong>Email: </strong>
              {currentUser.email}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2" style={{ maxWidth: "400px" }}>
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </>
      ) : (
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <strong>Email: </strong>
              {profile}
              <Link
                to="/message"
                state={{ sender: currentUser.email, recipient: profile }}
                className="btn btn-primary w-100 mt-3"
              >
                Message
              </Link>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
}
