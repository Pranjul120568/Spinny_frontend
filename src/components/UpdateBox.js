import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router";
import Loader from "./Loader";
import { clearErrors, getBoxDetails, updateBox } from "../actions/actions";
import { UPDATE_BOX_RESET } from "../constants/constants";

const UpdateBox = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [length, setLength] = useState(0);
  const [breadth, setBreadth] = useState(0);
  const [height, setHeight] = useState(0);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, box, loading } = useSelector((state) => state.boxDetails);

  const { error: updateError, isUpdated } = useSelector((state) => state.box);
  const boxId = params.id;

  useEffect(() => {
    console.log(box);
    if (box && box.id != boxId) {
      dispatch(getBoxDetails(boxId));
    } else {
      setLength(box.length);
      setBreadth(box.breadth);
      setHeight(box.height);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/");
      alert.success("Box updated successfully");
      dispatch({ type: UPDATE_BOX_RESET });
    }
  }, [dispatch, alert, error, isUpdated, updateError, boxId, box]);

  const submitHandler = (e) => {
    e.preventDefault();

    var boxData = { length: length, breadth: breadth, height: height };

    dispatch(updateBox(box.id, boxData));
  };
  // document.querySelector(".name_comp").value = product.name;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1>UPDATE</h1>
          <div
            className="wrapper my-5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <form
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
              style={{ padding: "20px" }}
            >
              <div className="form-group">
                <label htmlFor="name_field">Length</label>
                <input
                  type="number"
                  id="name_field"
                  className="form-control"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name_field">Breadth</label>
                <input
                  type="number"
                  id="name_field"
                  className="form-control"
                  value={breadth}
                  onChange={(e) => setBreadth(parseInt(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name_field">Height</label>
                <input
                  type="number"
                  id="name_field"
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                />
              </div>
              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                UPDATE
              </button>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateBox;
