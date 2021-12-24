import { Actions } from "./actionTypes";

const initialState = {
  tasks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.tasks.getTasksList:
      return { ...state, tasks: action.payload };
    case Actions.tasks.add:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case Actions.tasks.delete:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
