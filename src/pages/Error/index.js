import React, { Component, memo } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    const { error, errorInfo } = this.state;

    if (errorInfo) {
      return (
        <div style={{ maxWidth: "500px" }}>
          <h2>Something went wrong.</h2>
          <details stye={{ whiteSpace: "pre-wrap" }}>
            {error ? error.toString() : null}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
};

export default memo(ErrorBoundary);
