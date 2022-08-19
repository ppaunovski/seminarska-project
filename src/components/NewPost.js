import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function NewPost() {
  const [post, setPost] = useState("");
  const postsCollectionRef = collection(db, "posts");
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      author: auth.currentUser.email,
      authorID: auth.currentUser.uid,
      body: post,
      comments: 3,
      likes: 2,
      // postedAt: new Date().toISOString(),
      postedAt: serverTimestamp(),
    });

    setPost("");
  };
  return (
    <>
      <Form>
        <Form.Group>
          <TextField
            value={post}
            placeholder="What's on your mind?"
            fullWidth
            variant="standard"
            multiline
            onChange={(event) => {
              setPost(event.target.value);
            }}
          ></TextField>
        </Form.Group>
        <Button className="mt-2" onClick={createPost}>
          Post
        </Button>
      </Form>
    </>
  );
}
