import axios from "axios";
import { Actions } from "../store/actionTypes";
import { config } from "../config";

export const getTasks = () => {
  return async (dispatch, getState) => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axios
        .post(`${config.apiUrl}/tasks/getAll`, { authToken })
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: Actions.tasks.getTasksList,
            payload: res.data.tasks,
          });
        });
    } catch {
      console.log(authToken);
    }
  };
};

export const addTask = (task) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("authToken");
    console.log(token);
    try {
      await axios
        .post(`${config.apiUrl}/tasks/add`, { task: task, authToken: token })
        .then((res) => {
          console.log(res.data.task);
          dispatch({ type: Actions.tasks.add, payload: res.data.task });
        });
    } catch {
      console.log(token);
    }
  };
};

export const deleteTask = (id) => {
  console.log(id);
  return async (dispatch, getState) => {
    const token = localStorage.getItem("authToken");
    await axios
      .delete(`${config.apiUrl}/tasks/delete`, {
        data: { id: id, authToken: token },
      })
      .then((res) => {
        console.log(id);
        dispatch({ type: Actions.tasks.delete, payload: id });
      });
  };
};
