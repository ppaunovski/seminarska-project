import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Message from "./Message";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { getDocs, doc, addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../firebase";

function Chat() {
  const location = useLocation();
  const { sender, recipient } = location.state;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesCollectionRef = collection(db, "messages");

  useEffect(() => {
    const getMessages = async () => {
      const data = await getDocs(messagesCollectionRef);
      //console.log(data.docs);
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(messages);
    };

    getMessages();
    //
  }, []);

  const createMessage = async () => {
    // await addDoc(messagesCollectionRef, {
    //   message: message,
    //   recipient: recipient,
    //   sender: sender,
    // });

    await setDoc(doc(db, "messages"), {
      message: message,
      recipient: recipient,
      sender: sender,
    });

    setMessage("");
  };

  const handleSend = (e) => {
    e.preventDefault();
    createMessage();
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "gray",
        width: "55vw",
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: "10vh",
      }}
    >
      <Navigation />
      <div>Message</div>
      <div>From: {sender}</div>
      <div>To: {recipient}</div>
      {/* <Message /> */}
      <div>
        {messages &&
          messages.map((m) => {
            return <Message key={m.id} message={m.message} />;
          })}
      </div>
      <Form
        style={{
          position: "fixed",
          bottom: "2vh",
          width: "55vw",
          display: "flex",
          marginTop: "2vh",
        }}
      >
        <Form.Control
          type="text"
          placeholder="Enter message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></Form.Control>
        <Button onClick={handleSend}>Send</Button>
      </Form>
    </div>
  );
}

export default Chat;
