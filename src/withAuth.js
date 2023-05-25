import React from "react";
//import { withAuth } from '@okta/okta-react';

import { updateAuth } from "./apollo";

export default (Component) =>
  class WithAuth extends React.Component {
    state = {
      ...this.props.auth,
      authenticated: true,
      user: { sub: "1" },
      loading: false,
    };

    render() {
      const { auth, ...props } = this.props;
      return <Component {...props} auth={this.state} />;
    }
  };
