import React, { useEffect, useState } from "react";
import { Container, useAccordionButton } from "react-bootstrap";
import Navigation from "./Navigation";
import NewPost from "./NewPost";
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import Post from "./Post";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";

export default function Forum() {
  const { currentUser } = useAuth();
  const postsCollectionRef = collection(db, "posts");
  const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);
  //     setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getPosts();
  // }, [posts]);

  const getPosts = () => {
    const q = query(postsCollectionRef, orderBy("postedAt", "desc"), limit(10));

    onSnapshot(q, (QuerySnapshot) => {
      let pts = [];
      QuerySnapshot.forEach((doc) => {
        pts.push(doc.data());
      });
      setPosts(pts);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Navigation />
      <Container
        className="d-flex align-items-top justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Container style={{ marginTop: "100px" }}>
          <NewPost />
          <div className="posts">
            {posts.map((p) => {
              return <Post key={p.id} post={p} />;
            })}
          </div>
        </Container>
      </Container>
    </>
  );
}
