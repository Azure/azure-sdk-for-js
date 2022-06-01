// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { delay } = require("./delay");

/**
 * This function is named, so it should be exported by name and not by value.
 */
async function named(value, waitForMilliseconds) {
  await delay(waitForMilliseconds);
  console.log(value);
}

module.exports = { default: named };
