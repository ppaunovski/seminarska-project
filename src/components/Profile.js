import React, { useState, useEffect } from "react";
import { Card, Alert, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import { db, storage } from "../firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function Profile() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState({});
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const updateOnlineStatus = async (isOnline, email) => {
    await updateDoc(doc(db, "users", `${email}`), {
      isOnline: isOnline,
    });
    await deleteDoc(doc(db, "onlineUsers", `${email}`));
  };

  // const location = useLocation();

  // const { profile } = location.state;

  async function handleLogout() {
    setError("");

    try {
      const email = currentUser.email;
      await logout(currentUser.email);
      updateOnlineStatus(true, email);
      navigate("/login");
    } catch {
      setError("Failed to Log Out!");
    }
  }

  useEffect(() => {
    const getPP = async () => {
      const pp = await getDoc(doc(db, "users", `${id}`));
      console.log(pp);
      console.log(pp.data());
      setProfilePicture(pp.data());
      console.log(profilePicture.ppurl);
    };

    getPP();
  }, []);

  return (
    <>
      <>
        <Navbar></Navbar>
        <Card className="profile_card">
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="center">
              <img className="profile_avatar" src={profilePicture.ppurl}></img>
            </div>

            <strong>Email: </strong>
            {id}
            {currentUser.email === id ? (
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
            ) : (
              <Link
                to={`/messenger/${currentUser.email}/${id}`}
                state={{ sender: currentUser.email, recipient: id }}
                className="btn btn-primary w-100 mt-3"
              >
                Message
              </Link>
            )}
          </Card.Body>
        </Card>
        {currentUser.email === id ? (
          <div className="profile_logout">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        ) : (
          <></>
        )}
      </>
    </>
  );
}
