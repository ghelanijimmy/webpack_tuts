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
  const [dynamicData, setDynamicData] = useState("");
  const [data, setData] = useState("");

  const lazyData = useMemo(() => {
    return promiseWrapper(fetchData()).load();
  }, []);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        import(
          /* webpackChunkName: "dynamicLogic" */ "../helpers/dynamicLogic"
        ).then((d) => {
          setDynamicData(d.default());
        });
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    if (!data && lazyData) {
      setData(lazyData);
    }
  }, [data, lazyData]);

  return (
    <ElementWrapper>
      {data}
      <DynamicWrapper>{dynamicData && ` at ${dynamicData}`}</DynamicWrapper>
    </ElementWrapper>
  );
};

export default Element;
