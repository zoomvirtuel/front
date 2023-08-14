import axios from "axios";
import { PST, GST, ERROR } from "./actionsTypes.js";

const URL = import.meta.env.VITE_REACT_APP_URL;
const ST = import.meta.env.VITE_REACT_APP_ST;

export const pst = (cost) => {
  return async (dispatch) => {
    try {
      const endpoint = `${URL}/${ST}`;
      const { data } = await axios.post(endpoint, { cost });
      dispatch({
        type: PST,
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
