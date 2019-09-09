import { FETCH_MATRIX } from "./types";
import { matrix } from "../data/matrix";

export const fetchMatrix = () => {
  return {
    type: FETCH_MATRIX,
    payload: matrix
  };
};
