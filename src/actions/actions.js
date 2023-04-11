import axios from "axios";
import Cookies from "universal-cookie";
import {
  ALL_BOXES_FAIL,
  ALL_BOXES_REQUEST,
  ALL_BOXES_SUCCESS,
  BOX_DETAILS_FAIL,
  BOX_DETAILS_REQUEST,
  BOX_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_BOX_FAIL,
  DELETE_BOX_REQUEST,
  DELETE_BOX_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  NEW_BOX_FAIL,
  NEW_BOX_REQUEST,
  NEW_BOX_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_BOX_FAIL,
  UPDATE_BOX_REQUEST,
  UPDATE_BOX_SUCCESS,
} from "../constants/constants";
const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    console.log("emial", email, password);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: "true",
    };
    // const data={
    //   user:{
    //       email:"a@a.com",
    //       isStaff:true,
    //   }
    // }
    const { data } = await axios.post(
      "https://spinny-app.onrender.com/boxapi/login/",
      { email: email, password: password },
      config
    );
    // const cookies = new Cookies();
    // cookies.set("jwt", data.jwt, { secure: true, SameSite: "none" });
    // console.log("holllaaaaaaaa", cookies.get("jwt")); // Pacman
    localStorage.setItem("jwt", data.jwt);
    console.log("DATA-> ", data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: "LOGIN FAIL",
    });
  }
};
export const clearErrors = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const config = {
      withCredentials: "true",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    // const data={};
    await delay(1000);
    const bata = await axios.get(
      "https://spinny-app.onrender.com/boxapi/getuser/",
      config
    );
    const data = {
      user: {
        email: "a@a.com",
        // isStaff:true,
      },
    };
    console.log("bata->", bata);
    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: bata.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: "true",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    // const { data } = await axios.get(
    //   `https://spinny-app.onrender.com/boxapi/logout`,
    //   config,
    // );
    localStorage.setItem("jwt", "");

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      withCredentials: "true",
    };
    console.log("register-> ", userData);
    const data = {
      user: {
        email: "a@a.com",
      },
    };
    const bata = await axios.post(
      "https://spinny-app.onrender.com/boxapi/register/",
      userData,
      config
    );
    console.log(bata);
    localStorage.setItem("jwt", bata.data.jwt);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: bata.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getBoxes = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ALL_BOXES_REQUEST,
      });

      const config = {
        withCredentials: true,

        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      // await delay(1000);
      const bata = await axios.get(
        `https://spinny-app.onrender.com/boxapi/box/`,
        config
      );
      console.log("bata get", bata);
      const data = {
        boxes: [
          {
            id: 1,
            length: 1,
            breadth: 2,
            height: 3,
            area: 4,
            volume: 5,
            creator: "abcd",
            last_updated: "12/12/22",
            created_on: "12/11/23",
            cretaed_week: 4,
          },
          {
            id: 2,
            length: 1,
            breadth: 2,
            height: 3,
            area: 4,
            volume: 5,
            creator: "abcd",
            last_updated: "12/12/22",
            created_on: "12/11/23",
            cretaed_week: 4,
          },
        ],
      };
      dispatch({
        type: ALL_BOXES_SUCCESS,
        payload: data.boxes,
      });
    } catch (error) {
      dispatch({
        type: ALL_BOXES_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const deleteBox = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_BOX_REQUEST,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      const data1 = await axios.delete(
        `https://spinny-app.onrender.com/boxapi/deletebox/${id}`,
        config,
        id
      );
      console.log(data1);
      dispatch({
        type: DELETE_BOX_SUCCESS,
        payload: true,
      });
    } catch (error) {
      console.log("frontend->error", error.response);
      dispatch({
        type: DELETE_BOX_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const updateBox = (id, productData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_BOX_REQUEST,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        id,
      };
      productData.id = id;
      const data = await axios.put(
        `https://spinny-app.onrender.com/boxapi/updatebox/`,
        productData,
        config
      );
      dispatch({
        type: UPDATE_BOX_SUCCESS,
        payload: true,
      });
    } catch (error) {
      console.log("frontend->error", error.response);
      dispatch({
        type: UPDATE_BOX_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const getBoxDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: BOX_DETAILS_REQUEST,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        withCredentials: "true",
      };
      const { data } = await axios.post(
        `https://spinny-app.onrender.com/boxapi/getbox/${id}`,
        id,
        config
      );
      console.log("========" + data);
      // const data = {
      //   id: 1,
      //   length: 1,
      //   breadth: 2,
      //   height: 3,
      //   area: 4,
      //   volume: 5,
      //   creator: "abcd",
      //   last_updated: "12/12/22",
      //   created_on: "12/11/23",
      //   cretaed_week: 4,
      // };
      dispatch({
        type: BOX_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOX_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
export const newBox = (boxData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: NEW_BOX_REQUEST,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        withCredentials: "true",
      };
      const data = await axios.post(
        `https://spinny-app.onrender.com/boxapi/addbox/`,
        boxData,
        config
      );
      // const data = {
      //   id: 1,
      //   length: 1,
      //   breadth: 2,
      //   height: 3,
      //   area: 4,
      //   volume: 5,
      //   creator: "abcd",
      //   last_updated: "12/12/22",
      //   created_on: "12/11/23",
      //   cretaed_week: 4,
      // };
      dispatch({
        type: NEW_BOX_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("frontend->error", error.response);
      dispatch({
        type: NEW_BOX_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
export const getSearchBoxes = (
  max_length,
  min_length,
  max_breadth,
  min_breadth,
  max_height,
  min_height,
  max_area,
  min_area,
  max_volume,
  min_volume,
  max_date = "1999-09-09",
  min_date = "2032-03-03",
  email = ""
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ALL_BOXES_REQUEST,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      };
      // await delay(1000);
      const bata = await axios.get(
        `https://spinny-app.onrender.com/boxapi/box?max_length=${max_length}&min_length=${min_length}` +
          `&max_breadth=${max_breadth}&min_breadth=${min_breadth}&max_height=${max_height}&` +
          `min_height=${min_height}&max_area=${max_area}&min_area=${min_area}` +
          `&max_volume=${max_volume}&min_volume=${min_volume}&max_date=${max_date}&` +
          `min_date=${min_date}&email=${email}`,
        config
      );
      console.log("bata get", bata.data);
      const data = {
        boxes: [
          {
            id: 1,
            length: 1,
            breadth: 2,
            height: 3,
            area: 4,
            volume: 5,
            creator: "abcd",
            last_updated: "12/12/22",
            created_on: "12/11/23",
            cretaed_week: 4,
          },
          {
            id: 2,
            length: 1,
            breadth: 2,
            height: 3,
            area: 4,
            volume: 5,
            creator: "abcd",
            last_updated: "12/12/22",
            created_on: "12/11/23",
            cretaed_week: 4,
          },
        ],
      };
      dispatch({
        type: ALL_BOXES_SUCCESS,
        payload: bata.data,
      });
    } catch (error) {
      dispatch({
        type: ALL_BOXES_FAIL,
        payload: error.response.bata.message,
      });
    }
  };
};
