// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary validates several forms of CommonJS imports
 */

import a, {
  // This comment is only here to make sure it still appears in the output
  b,
} from "./hasDefaultExport";

import * as c from "./hasDefaultExport";

export async function main() {
  const waitTime = process.env.WAIT_TIME || "5000";
  const delayMs = parseInt(waitTime);

  if (isNaN(delayMs)) {
    throw new Error("Specified delay time is not a number.");
  }

  await a(b, 5000);

  await c.default(c.b, 1000);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
