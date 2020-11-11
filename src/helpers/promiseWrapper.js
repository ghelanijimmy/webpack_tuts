let status = "pending";
let result;
const promiseWrapper = (promise) => {
  let suspender = promise
    .then((r) => {
      status = "success";
      result = r;
    })
    .catch((e) => {
      status = "error";
      result = e;
    });

  return {
    load() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        return result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

export default promiseWrapper;
