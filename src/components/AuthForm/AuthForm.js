import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../Input/MyTextInput";
import MyCheckbox from "../Input/MyCheckbox";
import { Avatar, Box, Button, Container, Grid, Link } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import "./AuthForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import AlertModal from "../Modal/AlertModal";

const validationSignin = {
  email: Yup.string().email("Invalid email addresss").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
};

const validationSignup = {
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  ...validationSignin,
};

const AuthForm = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isSignin, setIsSignin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeAuthForm = () => {
    setIsSignin(!isSignin);
  };

  const submitHandler = (value) => {
    let url;
    let requestBody;
    if (isSignin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeEsX9xRgELgbcQ31U1MQY2leaVp3Bi1M";
      requestBody = {
        email: value.email,
        password: value.password,
        returnSecureToken: true,
      };
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeEsX9xRgELgbcQ31U1MQY2leaVp3Bi1M";
      requestBody = {
        ...value,
        returnSecureToken: true,
      };
    }
    axios
      .post(url, requestBody)
      .then((response) => {
        const expirationTime = +response.data.expiresIn * 1000;
        dispatch(
          authActions.login({
            token: response.data.idToken,
            expirationTime: expirationTime,
          })
        );
        navigate(-1);
        setErrorMessage("");
      })
      .catch((error) => {
        // alert(error.response.data.error.message);
        setIsOpenModal(true);
        setErrorMessage(error.response.data.error.message);
      });
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Container maxWidth="xs" sx={{ backgroundColor: "white" }}>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          {isSignin ? <LoginIcon /> : <AppRegistrationIcon />}
        </Avatar>
        <h1>{isSignin ? "Sign in" : "Sign up"}</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            acceptedTerms: false, // added for our checkbox
          }}
          validationSchema={Yup.object(
            isSignin ? validationSignin : validationSignup
          )}
          onSubmit={submitHandler}
        >
          <Form>
            {!isSignin && (
              <MyTextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="Jane"
                autoFocus
              />
            )}

            {!isSignin && (
              <MyTextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
              />
            )}

            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />

            <MyTextInput
              label="Password"
              name="password"
              type="password"
              placeholder=""
            />

            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" onClick={changeAuthForm} variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Form>
        </Formik>
      </Box>
      {isOpenModal && (
        <AlertModal closeModal={handleCloseModal} description={errorMessage} />
      )}
    </Container>
  );
};

export default AuthForm;
