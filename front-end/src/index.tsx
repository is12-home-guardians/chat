import React from "react";
import ReactDOM from "react-dom";
import App from "src/App";

const NotSupported = () => <b>Your browser does not support WebSockets.</b>;
const Component = (window as any)["WebSocket"] ? App : NotSupported;

ReactDOM.render(<Component />, document.getElementById("root"));
