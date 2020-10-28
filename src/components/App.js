import React, { lazy, Suspense } from "react";
import styled from "styled-components";

const LazyElement = lazy(() =>
  import(/* webpackChunkName: "Element" */ "./Element")
);

const AppWrapper = styled.div`
  background-color: #333;
  color: white;
`;

const App = () => {
  return (
    <AppWrapper>
      <h1>Hello World</h1>
      <div>
        <h2>Suspense</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyElement />
        </Suspense>
      </div>
    </AppWrapper>
  );
};

export default App;
