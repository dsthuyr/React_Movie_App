import { Button } from "@mui/material";
import React from "react";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

function NotifyPage(props) {
  const navigate = useNavigate();
  const backToPreviousPageHandler = () => {
    navigate(-1);
  };
  const navToLoginHandler = () => {
    navigate("/auth");
  };
  return (
    <>
      <div className="centered page-content">
        <h1>{props.text}</h1>
      </div>
      <div className="centered">
        <Button
          variant="contained"
          onClick={backToPreviousPageHandler}
          sx={{ mr: 2 }}
        >
          <ReplyAllIcon sx={{ mr: 2, ml: 2 }} /> Click to back
        </Button>
        <Button variant="contained" onClick={navToLoginHandler}>
          <LoginIcon sx={{ mr: 2, ml: 2 }} /> Click to Login
        </Button>
      </div>
    </>
  );
}

export default NotifyPage;
