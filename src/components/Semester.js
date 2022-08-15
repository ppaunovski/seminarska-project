import React, { useState, useEffect } from "react";
import {
  arrayUnion,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Card, ListGroup, ListGroupItem, Button, Form } from "react-bootstrap";
import { Input } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@emotion/react";
import Navigation from "./Navigation";

export default function Semester() {
  const location = useLocation();
  const { semester } = location;

  const [sem, setSem] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setSem(location.state.semester);
  }, []);

  const semCollectionRef = collection(db, "semesters");
  useEffect(() => {
    const getSub = async () => {
      const data = await getDocs(semCollectionRef);

      setSemesters(
        data.docs.map((doc) => ({ data: { ...doc.data() }, id: doc.id }))
      );
    };

    getSub();
  }, [sem, refresh]);

  let currentSubjects;

  if (semesters[sem - 1]) {
    currentSubjects = semesters[sem - 1].data.subjects;
  }

  const semesterCollectionRef = doc(db, "semesters", `${semester}`);

  const [addSubject, setAddSubject] = useState(false);
  const [newSubjectsTitle, setNewSubjectsTitle] = useState("");

  const addNewSubject = async () => {
    await updateDoc(doc(db, "semesters", `${sem}`), {
      subjects: arrayUnion(`${newSubjectsTitle}`),
    });

    await setDoc(doc(db, "subjects", `${newSubjectsTitle}`), {
      description: "",
    });

    setNewSubjectsTitle("");
    setRefresh(!refresh);
  };

  return (
    <>
      <Navigation />
      <Card>
        <Card.Title>
          <h2 className="text-center">Semester {sem}</h2>
        </Card.Title>
        <Card.Body>
          <ListGroup>
            {currentSubjects &&
              currentSubjects.map((s) => {
                return (
                  <ListGroupItem>
                    <Link
                      to="/semesters/semester/subject"
                      state={{ subject: s }}
                    >
                      {s}
                    </Link>
                  </ListGroupItem>
                );
              })}
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          {!addSubject ? (
            <Button
              variant="link"
              onClick={() => {
                setAddSubject(!addSubject);
              }}
            >
              Add new subject
            </Button>
          ) : (
            <>
              <Form>
                <Form.Control
                  type="text"
                  placeholder="Enter the name of the subject"
                  onChange={(event) => {
                    setNewSubjectsTitle(event.target.value);
                  }}
                ></Form.Control>
              </Form>
              <Button
                onClick={() => {
                  addNewSubject() && setAddSubject(!addSubject);
                }}
              >
                +
              </Button>
            </>
          )}
        </Card.Footer>
      </Card>
      <div>{currentSubjects && JSON.stringify(currentSubjects)} </div>
    </>
  );
}
