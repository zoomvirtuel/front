import axios from "axios";
import { PSK, GSK, ERROR } from "./actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const SK = import.meta.env.VITE_REACT_APP_SK;

export const psk = (cosk) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${SK}`;
      const { data } = await axios.post(endpoint, { cosk });
      dispatch({
        type: PSK,
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
