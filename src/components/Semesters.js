import { Card, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "bootstrap-react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Semester from "./Semester";

export default function Semesters() {
  const [semester, setSemester] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const semCollectionRef = collection(db, "semesters");
  useEffect(() => {
    const getSub = async () => {
      const data = await getDocs(semCollectionRef);

      setSemesters(
        data.docs.map((doc) => ({ data: { ...doc.data() }, id: doc.id }))
      );
      console.log(semesters);
    };

    getSub();
  }, [semester]);

  const setAllProps = async (sem) => {
    setSemester(sem);
  };

  return (
    <>
      <Navigation />

      <div>
        {semester ? (
          <Semester
            key={semester}
            semester={semester}
            subjects={semesters[semester - 1].data}
          />
        ) : (
          <Card>
            <h2 className="text-center">Semesters</h2>
            <Card.Body>
              <ListGroup>
                <ListGroupItem>
                  <Button
                    variant="link"
                    onClick={() => {
                      setAllProps(1);
                    }}
                  >
                    <Link
                      to="/semesters/semester"
                      state={{
                        semester: 1,
                      }}
                    >
                      Semester 1
                    </Link>
                  </Button>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    variant="link"
                    onClick={() => {
                      setAllProps(2);
                    }}
                  >
                    <Link
                      to="/semesters/semester"
                      state={{
                        semester: 2,
                      }}
                    >
                      Semester 2
                    </Link>
                  </Button>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    variant="link"
                    onClick={() => {
                      setAllProps(3);
                    }}
                  >
                    <Link
                      to="/semesters/semester"
                      state={{
                        semester: 3,
                      }}
                    >
                      Semester 3
                    </Link>
                  </Button>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    variant="link"
                    onClick={() => {
                      setAllProps(4);
                    }}
                  >
                    <Link
                      to="/semesters/semester"
                      state={{
                        semester: 4,
                      }}
                    >
                      Semester 4
                    </Link>
                  </Button>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    variant="link"
                    onClick={() => {
                      setAllProps(5);
                    }}
                  >
                    <Link
                      to="/semesters/semester"
                      state={{
                        semester: 5,
                      }}
                    >
                      Semester 5
                    </Link>
                  </Button>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    variant="link"
                    onClick={() => {
                      setAllProps(6);
                    }}
                  >
                    <Link
                      to="/semesters/semester"
                      state={{
                        semester: 6,
                      }}
                    >
                      Semester 6
                    </Link>
                  </Button>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    variant="link"
                    onClick={() => {
                      setAllProps(7);
                    }}
                  >
                    <Link
                      to="/semesters/semester"
                      state={{
                        semester: 7,
                      }}
                    >
                      Semester 7
                    </Link>
                  </Button>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    variant="link"
                    onClick={() => {
                      setAllProps(8);
                    }}
                  >
                    <Link
                      to="/semesters/semester"
                      state={{
                        semester: 8,
                      }}
                    >
                      Semester 8
                    </Link>
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        )}
      </div>
      {/* 
      <Card>
        <Card.Body>{JSON.stringify(displaySem.data)}</Card.Body>
      </Card>
      <Card>
        <Card.Body>
          {semesters.map((s) => {
            return <Semester key={displaySem.id} subjects={displaySem.data} />;
          })}
        </Card.Body>
      </Card> */}
    </>
  );
}
