import React, { Fragment, useState, useEffect } from "react";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";
import { clearErrors, newBox } from "../actions/actions";
import { NEW_BOX_RESET } from "../constants/constants";

const NewBox = () => {
  const navigate = useNavigate();
  const [length, setLength] = useState(0);
  const [breadth, setBreadth] = useState(0);
  const [height, setHeight] = useState(0);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newBox);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
      navigate("/");
    }

    if (success) {
      navigate("/");
      alert.success("Box created successfully");
      dispatch({ type: NEW_BOX_RESET });
    }
  }, [dispatch, alert, error, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    var boxData={"length":length,
                 "breadth":breadth,
                 "height":height
    };
    dispatch(newBox(boxData));
  };

  

  return (
    <Fragment>
                <h1>Radhe Radhe New Box</h1>
                <div className="wrapper my-5" style={{display:"flex",justifyContent:"center"}}>
                  <form
                    className="shadow-lg"
                    onSubmit={submitHandler}
                    encType="multipart/form-data"
                    style={{padding:"20px"}}
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
                      Insert
                    </button>
                  </form>
                </div>
              </Fragment>
  );
};

export default NewBox;
