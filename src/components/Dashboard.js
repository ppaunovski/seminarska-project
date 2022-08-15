import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import {
  Link,
  useNavigate,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Navigation from "./Navigation";
import Profile from "./Profile";
import Forum from "./Forum";
import Semesters from "./Semesters";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
      <Button>Forum</Button>
      <Button>Subjects</Button>
    </>
  );
}
