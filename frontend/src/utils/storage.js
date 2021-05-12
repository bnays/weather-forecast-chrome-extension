function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}

export default function foo() {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
    });
    return store;
  };
}
