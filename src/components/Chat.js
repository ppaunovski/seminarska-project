import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Message from "./Message";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import {
  getDoc,
  doc,
  addDoc,
  collection,
  setDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { TextField } from "@mui/material";
//
function Chat() {
  const location = useLocation();
  const { sender, recipient } = location.state;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [orderedMsgs, setOrderedMsgs] = useState([]);
  const scroll = useRef();

  const { currentUser } = useAuth();

  const id =
    sender > recipient ? `${sender + recipient}` : `${recipient + sender}`;

  const messagesCollectionRef = collection(db, "messages", id, "chat");

  const getMess = () => {
    const q = query(
      messagesCollectionRef,
      orderBy("createdAt", "asc"),
      limit(20)
    );

    onSnapshot(q, (QuerySnapshot) => {
      let msgs = [];
      QuerySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setOrderedMsgs(msgs);
    });
  };

  const [profilePicture, setProfilePicture] = useState({});

  useEffect(() => {
    getMess();

    const getPP = async () => {
      const pp = await getDoc(doc(db, "users", `${recipient}`));
      console.log(pp);
      console.log(pp.data());
      setProfilePicture(pp.data());
      console.log(profilePicture.ppurl);
    };

    getPP();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    const currentUserPP = await getDoc(
      doc(db, "users", `${currentUser.email}`)
    );

    await addDoc(messagesCollectionRef, {
      message: message,
      recipient: recipient,
      sender: sender,
      createdAt: serverTimestamp(),
    });
    await setDoc(doc(db, "users", `${currentUser.email}`, "chats", id), {
      chatter: currentUser.email === sender ? recipient : sender,
      chatterPP:
        currentUser.email === sender
          ? profilePicture.ppurl
          : currentUserPP.data().ppurl,
    });
    await setDoc(
      doc(
        db,
        "users",
        `${currentUser.email === sender ? recipient : sender}`,
        "chats",
        id
      ),
      {
        chatter: currentUser.email,
        chatterPP: currentUserPP.data().ppurl,
      }
    );
    setMessage("");
    scroll.current.scrollIntoView({ behavoir: "smooth" });
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "gray",
        width: "55vw",
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
        paddingBottom: "10vh",
        overflowY: "scroll",
      }}
    >
      <Navbar />

      <div>
        <div style={{ marginTop: "55px", marginBottom: "15px" }}>
          <div className="chat_header">
            <div className="chat_pp_recipient">
              <img src={profilePicture.ppurl}></img>
            </div>
            <h3>{recipient}</h3>
          </div>
          {orderedMsgs &&
            orderedMsgs.map((m) => {
              return (
                <Message
                  key={m.id}
                  message={m.message}
                  sender={m.sender}
                  createdAt={m.createdAt}
                />
              );
            })}

          <div ref={scroll}></div>
        </div>
        <div className="chat_form_wrap">
          <Form>
            <TextField
              type="text"
              variant="standard"
              multiline
              placeholder="Enter message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            ></TextField>
            <Button type="submit" onClick={handleSend}>
              Send
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
