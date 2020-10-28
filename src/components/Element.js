import React from "react";
import styled from "styled-components";

const ElementWrapper = styled.div`
  background-color: blue;
  color: white;
`;

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("loaded");
    }, 1000);
  });
}

let status = "pending";
let result;

function wrapPromise(promise) {
  let suspender = promise.then((r) => {
    console.log(r);
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
  const data = wrapPromise(fetchUser()).load();
  return <ElementWrapper>{data}</ElementWrapper>;
};

export default Element;
