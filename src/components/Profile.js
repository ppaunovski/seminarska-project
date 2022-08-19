import React, { useState, useEffect } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navigation from "./Navigation";
import { db, storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { getDoc, doc } from "firebase/firestore";

export default function Profile() {
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState({});
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

  useEffect(() => {
    const getPP = async () => {
      const pp = await getDoc(doc(db, "users", `${currentUser.email}`));
      console.log(pp);
      console.log(pp.data());
      setProfilePicture(pp.data());
      console.log(profilePicture.ppurl);
    };

    getPP();
  }, []);

  return (
    <>
      <Navigation />
      {currentUser.email === profile ? (
        <>
          <Card className="profile_card">
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <div className="center">
                <img
                  className="profile_avatar"
                  src={profilePicture.ppurl}
                ></img>
              </div>

              <strong>Email: </strong>
              {currentUser.email}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
            </Card.Body>
          </Card>
          <div className="profile_logout">
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
