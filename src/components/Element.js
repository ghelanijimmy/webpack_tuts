import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import promiseWrapper from "../helpers/promiseWrapper";

const ElementWrapper = styled.div`
  background-color: blue;
  color: white;
`;

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("loaded");
    }, 2000);
  });
}

let status = "pending";
let result;

function wrapPromise(promise) {
  let suspender = promise.then((r) => {
    status = "success";
    result = r;
  });
  return {
    load() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

const Element = () => {
  const [dynamicData, setDynamicData] = useState("");
  const [data, setData] = useState("");

  // const lazyData = promiseWrapper(fetchUser()).load;

  const lazyData = useMemo(() => {
    return promiseWrapper(fetchUser()).load();
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
    if (!data && lazyData) setData(lazyData);
  }, [data, lazyData]);

  return (
    <ElementWrapper>
      {data}
      {dynamicData && ` at ${dynamicData}`}
    </ElementWrapper>
  );
};

export default Element;
