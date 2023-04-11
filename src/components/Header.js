import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../actions/actions";

export default function Header() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Box
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active"></li>
          </ul>
          {user && user.is_staff ? (
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link to="/newBox" className="nav-link" href="#">
                  Insert New Box <span className="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          ) : (
            <Fragment></Fragment>
          )}
          <form className="form-inline my-2 my-lg-0">
            <div className="nav-item active">
              {user ? (
                <Fragment>
                  <a className="nav-link" href="#">
                    {user.username}
                    <span className="sr-only">(current)</span>
                  </a>
                  <a style={{ cursor: "pointer" }} onClick={logoutHandler}>
                    LOGOUT
                  </a>
                </Fragment>
              ) : (
                <a>LOGIN</a>
              )}
            </div>
          </form>
        </div>
      </nav>
    </Fragment>
  );
}
