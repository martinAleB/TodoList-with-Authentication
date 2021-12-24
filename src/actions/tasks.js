import axios from "axios";
import { Actions } from "../store/actionTypes";

export const getTasks = () => {
  return async (dispatch, getState) => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axios
        .post("/.netlify/functions/app/tasks/getAll", { authToken })
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: Actions.tasks.getTasksList,
            payload: res.data.tasks,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addTask = (task) => {
  return async (dispatch, getState) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .post("/.netlify/functions/app/tasks/add", {
          task: task,
          authToken: token,
        })
        .then((res) => {
          dispatch({ type: Actions.tasks.add, payload: res.data.task });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteTask = (id) => {
  console.log(id);
  return async (dispatch, getState) => {
    const token = localStorage.getItem("authToken");
    await axios
      .delete("/.netlify/functions/app/tasks/delete", {
        data: { id: id, authToken: token },
      })
      .then((res) => {
        dispatch({ type: Actions.tasks.delete, payload: id });
      });
  };
};
