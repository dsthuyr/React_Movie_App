import { Box, Container } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import LoginIcon from "@mui/icons-material/Login";
import PasswordIcon from "@mui/icons-material/Password";
import EmailIcon from "@mui/icons-material/Email";
import ChangePasswordForm from "./ChangePasswordForm";
import LoadingSpinner from "../UI/LoadingSpinner";

function Profile() {
  const token = useSelector((state) => state.auth.token);
  const [userData, setUserData] = useState(null);
  const getUserProfile = useCallback(() => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAeEsX9xRgELgbcQ31U1MQY2leaVp3Bi1M",
        { idToken: token }
      )
      .then((response) => {
        setUserData(response.data.users[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);
  return (
    <Container maxWidth="sm" sx={{ backgroundColor: "white" }}>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            mb: 3,
          }}
        >
          User Profile
        </Typography>
        {!userData && (
          <div className="centered">
            <LoadingSpinner />
          </div>
        )}
        {userData && (
          <List
            sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`Email: ${userData.email}`} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CreateIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Create Date:  ${new Date(
                  parseInt(userData.createdAt)
                ).toUTCString()}`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LoginIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Last Login:  ${new Date(
                  parseInt(userData.lastLoginAt)
                ).toUTCString()}`}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PasswordIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Change Password:"} />
            </ListItem>
            <ChangePasswordForm />
          </List>
        )}
      </Box>
    </Container>
  );
}

export default Profile;
