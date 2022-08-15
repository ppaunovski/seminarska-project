import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";

export default function Semester1() {
  const [subject, setSubject] = useState("");

  useEffect(() => {}, [subject]);

  return (
    <>
      <Navigation />
      <Card>
        <Card.Body>
          <h2 className="text-center">Семестар 1 {subject}</h2>

          <ListGroup>
            <ListGroupItem>
              <Button variant="link" onClick={() => setSubject("sp")}>
                Структурно програмирање
              </Button>
            </ListGroupItem>
            <ListGroupItem>
              <Button variant="link" onClick={() => setSubject("vvkn")}>
                Вовед во компјутерските науки
              </Button>
            </ListGroupItem>
            <ListGroupItem>
              <Button variant="link" onClick={() => setSubject("pv")}>
                Професионални вештини
              </Button>
            </ListGroupItem>
            <ListGroupItem>
              <Button variant="link" onClick={() => setSubject("k1")}>
                Калкулус 1
              </Button>
            </ListGroupItem>
            <ListGroupItem>
              <Button variant="link" onClick={() => setSubject("ds1")}>
                Дискретни структури 1
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}
