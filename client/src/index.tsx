import {
  ApolloProvider
} from "@apollo/client";
import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { client } from "./utils/apolloClient";
import { store } from "./utils/reduxStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
      <ApolloProvider client={client}>
    <CssBaseline />
    <App />
    </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
