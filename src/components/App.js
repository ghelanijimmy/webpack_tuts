import React, { lazy, Suspense } from "react";
import styled from "styled-components";

const LazyElement = lazy(() =>
  import(/* webpackChunkName: "Element" */ "./Element")
);

const AppWrapper = styled.div`
  background-color: #333;
  color: white;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-around;
`;

const App = () => {
  return (
    <AppWrapper>
      <h1>Hello World</h1>
      <FlexWrapper>
        <div>
          <h2>Suspense</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <LazyElement />
          </Suspense>
        </div>
        <div>
          <h2>Dynamic</h2>
        </div>
      </FlexWrapper>
    </AppWrapper>
  );
};

export default App;
