import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navigation from "./Navigation";
import NewPost from "./NewPost";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";

export default function Forum() {
  const postsCollectionRef = collection(db, "posts");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [posts]);

  return (
    <>
      <Navigation />
      <Container
        className="d-flex align-items-top justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Container style={{ marginTop: "100px" }}>
          <NewPost />
          <div>
            {posts.map((p) => {
              return <Post key={p.id} post={p} />;
            })}
          </div>
        </Container>
      </Container>
    </>
  );
}
