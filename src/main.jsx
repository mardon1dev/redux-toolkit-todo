import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store } from "./reduxtoolkit/store.jsx";
import { Provider } from "react-redux";
import "./index.css"
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);