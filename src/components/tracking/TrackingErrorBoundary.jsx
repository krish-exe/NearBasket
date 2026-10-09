import { Component } from "react";

// Keeps a failure in the tracking UI (e.g. the map failing to initialise) from taking down the app.
export default class TrackingErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  retry = () => this.setState({ failed: false });

  render() {
    if (this.state.failed) return this.props.renderFallback(this.retry);
    return this.props.children;
  }
}
