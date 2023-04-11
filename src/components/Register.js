import React, { Fragment, useState, useEffect } from "react";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
// import { register, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router";
import { clearErrors, register } from "../actions/actions";
import Loader from "./Loader";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { username, email, password, confirm_password } = user;

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    var userData = {
      username: username,
      email: email,
      password: password,
      confirm_password: confirm_password,
    };
    dispatch(register(userData));
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="row wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div className="col-10 col-lg-5">
            <form
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
              style={{ padding: "20px" }}
            >
              <h1 className="mb-3">Register</h1>

              <div className="form-group">
                <label htmlFor="email_field">UserName</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password_field">Confirm Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="confirm_password"
                  value={confirm_password}
                  onChange={onChange}
                />
              </div>
              <button
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Register;
