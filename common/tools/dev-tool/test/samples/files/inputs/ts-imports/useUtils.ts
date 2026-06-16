// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary verifies that relative imports written with a `.ts` extension are
 *  rewritten to `.js` in the published samples.
 */

import { greet } from "./utils/helpers.ts";
import { CONSTANT } from "./utils/constants.ts";

async function main(): Promise<void> {
  console.log(greet("world"));
  console.log("constant:", CONSTANT);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
