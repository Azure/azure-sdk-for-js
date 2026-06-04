// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary verifies that relative imports written with a `.ts` extension are
 *  rewritten to `.js` in the published samples.
 */

const { greet } = require("./utils/helpers.js");
const { CONSTANT } = require("./utils/constants.js");

async function main() {
  console.log(greet("world"));
  console.log("constant:", CONSTANT);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
