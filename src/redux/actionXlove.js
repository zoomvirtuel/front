import axios from "axios";
import { PXL, GXL, ERROR } from "./actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const XL = import.meta.env.VITE_REACT_APP_XL;

export const pxl = (coxl) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${XL}`;
      const { data } = await axios.post(endpoint, { coxl });
      dispatch({
        type: PXL,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.response.data.error,
      });
    }
  };
};
