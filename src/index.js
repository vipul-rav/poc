import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
//import { Security, ImplicitCallback } from '@okta/okta-react';
import { ApolloProvider } from "react-apollo";

import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import client from "./apollo";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Route path="/" component={App} />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
if (module.hot) module.hot.accept();
