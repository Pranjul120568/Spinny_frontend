import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { clearErrors, login } from "../actions/actions";
import Loader from "./Loader";

function Login() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, loading, user, error } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      console.log("YAAY");
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated, loading]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {isAuthenticated ? (
            <Navigate to="/"></Navigate>
          ) : (
            <Fragment>
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
                    style={{ padding: "20px" }}
                  >
                    <h1 className="mb-3">Login</h1>
                    <div className="form-group">
                      <label htmlFor="email_field">Email</label>
                      <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password_field">Password</label>
                      <input
                        type="password"
                        id="password_field"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button
                      id="login_button"
                      type="submit"
                      className="btn btn-block py-3"
                    >
                      LOGIN
                    </button>

                    <Link to="/register" className="float-right mt-3">
                      New User?
                    </Link>
                  </form>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Login;
