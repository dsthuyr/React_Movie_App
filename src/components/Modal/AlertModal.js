import { Button } from "@mui/material";
import React from "react";
import classes from "./AlertModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.dialog} onClick={props.closeModal} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes["dialog-container"]}>
      <div className={classes["dialog-header"]}>Alert !!!</div>
      <div className={classes["dialog-body"]}>{props.description}</div>
      <div className={classes["dialog-footer"]}>
        <Button onClick={props.closeModal} variant="contained">
          Close
        </Button>
      </div>
    </div>
  );
};

function AlertModal(props) {
  return (
    <>
      <Backdrop closeModal={props.closeModal} />
      <ModalOverlay
        closeModal={props.closeModal}
        description={props.description}
      />
    </>
  );
}
export default AlertModal;
