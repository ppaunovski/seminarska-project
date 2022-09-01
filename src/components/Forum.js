import React, { useCallback, useEffect, useRef, useState } from "react";
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
  startAfter,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import Post from "./Post";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { Box, Button } from "@mui/material";

export default function Forum() {
  const postsCollectionRef = collection(db, "posts");
  const [posts, setPosts] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [nextQuery, setNextQuery] = useState({});

  const getPosts = async () => {
    let q;
    if (isFirst) {
      q = query(postsCollectionRef, orderBy("postedAt", "desc"), limit(5));
      setIsFirst(false);
    } else {
      console.log("next", nextQuery);
      q = nextQuery;
    }

    const documentSnapshots = await getDocs(q);
    documentSnapshots.docs.map((doc) => {
      const data = doc.data();
      setPosts((prev) => [...prev, { data: data, id: doc.id }]);
    });

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    console.log("last", lastVisible);

    if (lastVisible) {
      setNextQuery(
        query(
          postsCollectionRef,
          orderBy("postedAt", "desc"),
          startAfter(lastVisible),
          limit(5)
        )
      );
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Box flex={3}>
      <Container>
        <Container>
          <NewPost />
          <div className="posts">
            {posts.map((p) => {
              return <Post key={p.id} post={p.data} postId={p.id} />;
            })}
          </div>
          <Button onClick={getPosts}>Load more</Button>
        </Container>
      </Container>
    </Box>
  );
}
