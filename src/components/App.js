import React, { useCallback, lazy, Suspense, useState, useEffect } from "react";
import styled from "styled-components";

// const Element = lazy(() =>
// 	import(/* webpackChunkName: "Element" */ "./Element")
// );

const AppWrapper = styled.div`
	background-color: #333;
	color: white;
`;

const App = () => {
	const [Element, setElement] = useState();
	useEffect(() => {
		if (!Element) {
			import("./Element").then((el) => {
				console.log(el.default);
				setElement(el.default);
			});
		}
	}, [Element]);
	return (
		<AppWrapper>
			<h1>Hello World</h1>
			<Suspense fallback={<div>Loading...</div>}></Suspense>
			{console.log(Element)}
			{Element && Element}
		</AppWrapper>
	);
};

export default App;
