import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "./Navigation";

function SubjectPage() {
  const location = useLocation();
  const { subject } = location.state;
  return (
    <>
      <Navigation />
      <div>SubjectPage - {subject}</div>
    </>
  );
}

export default SubjectPage;
