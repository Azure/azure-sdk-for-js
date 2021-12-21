// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { delay };
