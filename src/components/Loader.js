import React, { Fragment } from "react";
import spinner from "./spinner.gif";

function Loader(props) {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "500px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
      {/* LOADING.... */}
    </Fragment>
  );
}

export default Loader;
