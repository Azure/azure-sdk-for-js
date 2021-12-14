// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { delay } = require("./delay");

async function named(value, waitForMilliseconds) {
  await delay(waitForMilliseconds);
  console.log(value);
}

module.exports = { default: named };
