import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "./Chat";
import Navbar from "./Navbar";
import RecentChats from "./RecentChats";

function Messenger() {
  const location = useLocation();
  const { sender, recipient } = location.state;
  return (
    <>
      <Navbar />
      <Stack direction="row" justifyContent="space-between" overflow={"hidden"}>
        <RecentChats />
        {recipient && <Chat sender={sender} recipient={recipient} />}
      </Stack>
    </>
  );
}

export default Messenger;
