
import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/actions";
import Register from "./components/Register";
import UpdateBox from "./components/UpdateBox";
import NewBox from "./components/NewBox";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Fragment>
      <Router>
        <Header/>
        <Routes>
         <Route path="/login" exact element={<Login/>} /> 
         <Route path="/register" exact element={<Register/>} /> 
         <Route exact path="/" element={<PrivateRoute />}>
           <Route path="/" exact element={<Home/>} />
         </Route>
         <Route exact path="/updateBox/:id" element={<PrivateRoute />}>
           <Route path="/updateBox/:id" exact element={<UpdateBox/>} />
         </Route>
         <Route exact path="/newBox" element={<PrivateRoute />}>
           <Route path="/newBox" exact element={<NewBox/>} />
         </Route>
          {/* <Route path="/" exact element={<Home />} />
          <Route exact path="/admin/product/:id" element={<PrivateRoute />}>
            <Route
              path="/admin/product/:id"
              exact
              element={<UpdateProduct />}
            />
          </Route> */}
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
