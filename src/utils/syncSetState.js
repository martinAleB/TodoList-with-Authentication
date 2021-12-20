export const syncSetState = (updateStateFunction, newStateValue) => {
  Promise.resolve().then(() => {
    updateStateFunction(newStateValue);
  });
};
