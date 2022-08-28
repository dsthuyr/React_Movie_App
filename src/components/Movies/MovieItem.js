import React from "react";
import { Link } from "react-router-dom";
import classes from "./MovieItem.module.css";

function MovieItem(props) {
  return (
    <li>
      <Link to={`/detailMovie/${props.id}`} className={classes.card}>
        <img src={props.img} className={classes.card__image} alt={props.name} />
        <div className={classes.card__overlay}>
          <div className={classes.card__header}>
            <div className={classes.card__header_text}>
              <h3 className={classes.card__title}>{props.name}</h3>
              <span className={classes.card__status}>{props.category}</span>
            </div>
          </div>
          <div className={classes.card__description}>{props.description}</div>
        </div>
      </Link>
    </li>
  );
}

export default MovieItem;
