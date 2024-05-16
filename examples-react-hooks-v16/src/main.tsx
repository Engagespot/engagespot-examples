import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";
import { UserProvider } from "./providers/UserProvider";

function Main() {
  return (
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Main />, document.getElementById("root"));
