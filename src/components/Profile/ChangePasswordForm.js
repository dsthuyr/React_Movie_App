import { Button } from "@mui/material";
import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import MyTextInput from "../Input/MyTextInput";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";

const validatePassword = {
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
};

function ChangePasswordForm() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (value) => {
    const requestBody = {
      idToken: token,
      password: value.password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAeEsX9xRgELgbcQ31U1MQY2leaVp3Bi1M",
        requestBody
      )
      .then((response) => {
        dispatch(authActions.login({ token: response.data.idToken }));
        navigate("/");
        alert("Change password success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Formik
        initialValues={{
          password: "",
        }}
        validationSchema={Yup.object(validatePassword)}
        onSubmit={submitHandler}
      >
        <Form>
          <MyTextInput
            sx={{ mt: 2, mb: 2 }}
            label="Password"
            name="password"
            type="password"
            placeholder=""
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
}

export default ChangePasswordForm;
