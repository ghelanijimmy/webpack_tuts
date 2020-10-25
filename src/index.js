import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

const RenderApp = () => {
	return <App />;
};

ReactDOM.render(<RenderApp />, document.getElementById("app"));
