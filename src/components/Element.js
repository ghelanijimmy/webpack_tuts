import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import promiseWrapper from "../helpers/promiseWrapper";

const ElementWrapper = styled.div`
  background-color: blue;
  color: white;
`;

const DynamicWrapper = styled.div`
  background-color: #eaac39;
  color: #333;
`;

function fetchData(simulateFalse) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateFalse) reject(null);
      else resolve("loaded");
    }, 2000);
  });
}

const Element = () => {
  const [DynamicData, setDynamicData] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const lazyData = useMemo(() => {
    return promiseWrapper(fetchData()).load();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      setTimeout(() => {
        import(
          /* webpackChunkName: "dynamicLogic" */ "../helpers/dynamicLogic"
        ).then((d) => {
          setDynamicData(d.default);
        });
      }, 2000);
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (!dataLoaded && lazyData) {
      setDataLoaded(true);
    }
  }, [dataLoaded, lazyData]);

  return (
    <ElementWrapper>
      <div>{lazyData}</div>
      <img src="https://placehold.it/300x200" alt="placeholder image" />
      {(DynamicData && <DynamicWrapper>at {DynamicData}</DynamicWrapper>) || (
        <p>Loading</p>
      )}
    </ElementWrapper>
  );
};

export default Element;
