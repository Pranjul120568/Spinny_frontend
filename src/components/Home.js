import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
// import { DELETE_PRODUCT_RESET } from "../../constants/ProductConstants";
// import Sidebar from "./Sidebar";
import Loader from "./Loader";
import {
  clearErrors,
  deleteBox,
  getBoxes,
  getSearchBoxes,
} from "../actions/actions";
import { DELETE_BOX_RESET } from "../constants/constants";

const mystyle = {
  display: "flex",
  "flex-direction": "row",
};
const Home = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, boxes } = useSelector((state) => state.boxes);
  const { user } = useSelector((state) => state.auth);
  const { error: deleteError, isDeleted } = useSelector((state) => state.box);
  const [length, setLength] = useState(0);
  const [maxlength, setMaxlength] = useState(1000);
  const [breadth, setBreadth] = useState(0);
  const [maxbreadth, setMaxbreadth] = useState(1000);
  const [height, setHeight] = useState(0);
  const [maxheight, setMaxheight] = useState(1000);
  const [area, setArea] = useState(0);
  const [maxarea, setMaxarea] = useState(1000);
  const [volume, setVolume] = useState(0);
  const [maxvolume, setMaxvolume] = useState(1000);
  const [date, setDate] = useState("2023-02-02");
  const [maxdate, setMaxdate] = useState("2033-02-02");
  const [email, setEmail] = useState("");
  useEffect(() => {
    dispatch(
      getSearchBoxes(
        maxlength,
        length,
        maxbreadth,
        breadth,
        maxheight,
        height,
        maxarea,
        area,
        maxvolume,
        volume,
        maxdate,
        date,
        email
      )
    );

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Box deleted successfully");
      navigate("/");
      dispatch({ type: DELETE_BOX_RESET });
    }
    //,
  }, [dispatch, alert, error, deleteError, isDeleted]);

  //=====
  const deleteProductHandler = (box_id) => {
    dispatch(deleteBox(box_id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      getSearchBoxes(
        maxlength,
        length,
        maxbreadth,
        breadth,
        maxheight,
        height,
        maxarea,
        area,
        maxvolume,
        volume,
        maxdate,
        date,
        email
      )
    );
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label for="max_length">Max length</label>
          <input
            id="max_length"
            type="number"
            onChange={(e) => {
              if (e.target.value != "") setMaxlength(parseInt(e.target.value));
              else setMaxlength(1000);
            }}
          />

          <label for="min_length">Min length</label>
          <input
            id="min_length"
            type="number"
            onChange={(e) => {
              if (e.target.value != "") setLength(parseInt(e.target.value));
              else setLength(0);
            }}
          />

          <label for="max_breadth">Max breadth</label>
          <input
            id="max_breadth"
            type="number"
            onChange={(e) => {
              if (e.target.value != "") setMaxbreadth(parseInt(e.target.value));
              else setMaxbreadth(1000);
            }}
          />

          <label for="min_breadth">Min breadth</label>
          <input
            id="min_breadth"
            type="number"
            onChange={(e) => {
              if (e.target.value != "") setBreadth(parseInt(e.target.value));
              else setBreadth(0);
            }}
          />

          <label for="max_height">Max height</label>
          <input
            id="max_height"
            type="number"
            onChange={(e) => {
              if (e.target.value != "") setMaxheight(parseInt(e.target.value));
              else setMaxheight(1000);
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label for="min_height">Min height</label>
          <input
            id="min_height"
            type="number"
            onChange={(e) => {
              if (e.target.value != "") setHeight(parseInt(e.target.value));
              else setHeight(0);
            }}
          />

          <label for="max_area">Max area</label>
          <input
            id="max_area"
            type="number"
            onChange={(e) => {
              if (e.target.value != "") setMaxarea(parseInt(e.target.value));
              else setMaxarea(100000);
            }}
          />

          <label for="min_area">Min area</label>
          <input
            id="min_area"
            type="number"
            onChange={(e) => {
              if (e.target.value != "") setArea(parseInt(e.target.value));
              else setArea(0);
            }}
          />

          <label for="max_volume">Max volume</label>
          <input
            id="max_volume"
            type="number"
            onChange={(e) => {
              if (e.target.value != "") setMaxvolume(parseInt(e.target.value));
              else setMaxvolume(100000);
            }}
          />

          <label for="min_volume">Min volume</label>
          <input
            id="min_volume"
            type="number"
            onChange={(e) => {
              if (e.target.value != "") setVolume(parseInt(e.target.value));
              else setVolume(0);
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label for="min_date">Date from</label>
          <input
            id="min_date"
            type="date"
            onChange={(e) => {
              if (e.target.value != "") setDate(e.target.value);
              else setDate("2023-02-02");
            }}
          />

          <label for="max_date">Date to</label>
          <input
            id="max_date"
            type="date"
            onChange={(e) => {
              if (e.target.value != "") setMaxdate(e.target.value);
              else setMaxdate("2033-02-02");
            }}
          />

          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            defaultValue={""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">GET</button>
      </form>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Length</th>
                  <th scope="col">Breadth</th>
                  <th scope="col">Height</th>
                  <th scope="col">Area</th>
                  <th scope="col">Volume</th>
                  {!user.is_staff ? (
                    <Fragment></Fragment>
                  ) : (
                    <Fragment>
                      <th scope="col">Created By</th>
                      <th scope="col">Created On</th>
                      <th scope="col">Last Updated on</th>
                      <th scope="col">D</th>
                      <th scope="col">U</th>
                    </Fragment>
                  )}
                </tr>
              </thead>
              <tbody>
                {boxes.map((box, i) => (
                  <tr key={box.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{box.length}</td>
                    <td>{box.breadth}</td>
                    <td>{box.height}</td>
                    <td>{box.area}</td>
                    <td>{box.volume}</td>
                    {!user.is_staff ? (
                      <Fragment></Fragment>
                    ) : (
                      <Fragment>
                        <td>{box.creator}</td>
                        <td>{box.created_on}</td>
                        <td>{box.last_updated_on}</td>
                        {user.email == box.creator ? (
                          <td
                            onClick={() => deleteProductHandler(box.id)}
                            style={{ cursor: "pointer" }}
                          >
                            Delete
                          </td>
                        ) : (
                          <td></td>
                        )}
                        <td>
                          <Link
                            to={`/updateBox/${box.id}`}
                            style={{
                              cursor: "pointer",
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            Update
                          </Link>
                        </td>
                      </Fragment>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default Home;
