import { Avatar, Box, List, ListItem, ListItemButton } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Rightbar() {
  const { currentUser } = useAuth();
  const [activeChats, setActiveChats] = useState([]);
  useEffect(() => {
    const getChats = async () => {
      const chats = await getDocs(
        collection(db, "users", `${currentUser.email}`, "chats")
      );
      setActiveChats(
        chats.docs.map((chat) => ({ data: { ...chat.data() }, id: chat.id }))
      );
    };

    getChats();
  }, []);

  useEffect(() => {
    if (activeChats) {
      //console.log(activeChats);
    }
  }, [activeChats]);
  return (
    <Box flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box sx={{ position: "fixed" }}>
        <List>
          <ListItem>
            <h5>Recent chats</h5>
          </ListItem>
          {activeChats.map((chat) => {
            return (
              <Link
                to={`/profile/${chat.data.chatter}/message`}
                state={{
                  sender: currentUser.email,
                  recipient: chat.data.chatter,
                }}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem sx={{ margin: "0", padding: "2px 3px" }}>
                  <ListItemButton
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0",
                      margin: "0",
                      justifyContent: "center",
                    }}
                  >
                    {chat.data.chatterPP && (
                      <Avatar
                        sx={{ width: 34, height: 34 }}
                        src={chat.data.chatterPP}
                      />
                    )}
                    <p
                      style={{
                        width: "100px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {chat.data.chatter}
                    </p>
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

export default Rightbar;
