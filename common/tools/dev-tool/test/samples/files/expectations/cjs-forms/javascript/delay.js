// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { delay };
