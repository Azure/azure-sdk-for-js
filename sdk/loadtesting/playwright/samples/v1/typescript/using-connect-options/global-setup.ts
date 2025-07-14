const func = async function () {
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log("Customer Global Setup");
};

module.exports = func;
