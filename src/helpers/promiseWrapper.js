let status = "pending";
let result;
const promiseWrapper = (promise) => {
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
};

export default promiseWrapper;
