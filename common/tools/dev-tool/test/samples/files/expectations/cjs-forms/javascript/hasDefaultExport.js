// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const b = "Hello world!";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  b,
  default: async function (value, waitForMilliseconds) {
    await delay(waitForMilliseconds);
    console.log(value);
  },
};
