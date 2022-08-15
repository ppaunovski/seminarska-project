import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Post(props) {
  const [showComms, setShowComms] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [like, setLike] = useState(false);
  const [likeID, setLikeID] = useState("");
  const [likes, setLikes] = useState([]);

  const commentsCollectionRef = collection(db, "comments");
  const likesCollectionRef = collection(db, "likes");

  useEffect(() => {
    const getComments = async () => {
      const data = await getDocs(commentsCollectionRef);
      setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getComments();
  }, [comments]);

  useEffect(() => {
    const getLikes = async () => {
      const data = await getDocs(likesCollectionRef);
      setLikes(data.docs.map((doc) => ({ ...doc.data() })));

      getLikes();
    };
  }, []);

  const createNewLike = async () => {
    await addDoc(likesCollectionRef, {
      user: auth.currentUser.email,
      postID: props.post.id,
    });
  };

  const createNewComment = async () => {
    await addDoc(commentsCollectionRef, {
      author: auth.currentUser.email,
      authorID: auth.currentUser.uid,
      body: newComment,
      postID: props.post.id,
      postedAt: new Date().toISOString(),
    });

    setNewComment("");
  };

  const toggleLike = () => {
    setLike(!like);
    if (like) {
      createNewLike();
    } else {
      // deleteDoc(doc(db, "likes", `${likeID}`));
    }
  };

  const showLikes = () => {
    let count = 0;
    for (let i = 0; i <= likes.length(); i++) {
      if (
        likes[i].postID === props.post.id &&
        likes[i].user === auth.currentUser.email
      ) {
        count++;
      }
    }
    return count;
  };

  return (
    <Card>
      <Card.Title>
        <Link to="/profile" state={{ profile: props.post.author }}>
          {props.post.author}
        </Link>
      </Card.Title>
      <Card.Body>
        <Card.Text>{props.post.body}</Card.Text>
        <Button onClick={toggleLike}>Like{showLikes}</Button>
      </Card.Body>

      <Card.Footer>
        <Button variant="link" onClick={() => setShowComms(!showComms)}>
          Show comments
        </Button>
        {showComms && (
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Write your comment..."
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
              ></Form.Control>
              <Button onClick={createNewComment}>Post</Button>
            </Form.Group>
            {comments.map((c) => {
              if (props.post.id === c.postID) {
                return (
                  <Card>
                    <Card.Body>
                      <Card.Subtitle>{c.author}</Card.Subtitle>
                      <Card.Text>{c.body}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              }
            })}
          </Form>
        )}
      </Card.Footer>
    </Card>
  );
}
