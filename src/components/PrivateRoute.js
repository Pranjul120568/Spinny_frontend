import React from "react";
import { connect, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  // const ans = this.props.auth.isAuthenticated;
  const { isAuthenticated } = useSelector((state) => state.auth);
  const ans = isAuthenticated;
  // console.log("ANS-> ", ans); // determine if authorized, from context or however you're doing it

  return ans ? <Outlet /> : <Navigate to="/login" />;
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(PrivateRoute);
