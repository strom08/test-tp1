import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Shop from "./components/Shop";

function App() {
  return (
    <Provider store={store}>
      <Shop />
    </Provider>
  );
}

export default App;
