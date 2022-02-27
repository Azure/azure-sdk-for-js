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

import f from "./hasNamedDefaultExport";

import * as base from "./defaultExportsNamedClass";
import Anonymous from "./defaultExportsClass";

import "./hasSideEffects";

// Test builtins
import * as path_1 from "path";
import path_2 from "path";

import test1, { x as x1 } from "@azure/test1";
import test2, { x as x2 } from "@azure-test2/test2";

void [test1, test2, x1, x2];

async function main() {
  const waitTime = process.env.WAIT_TIME || "5000";
  const delayMs = parseInt(waitTime);

  if (isNaN(delayMs)) {
    throw new Error("Specified delay time is not a number.");
  }

  await a(b, 5000);
  await c.default(c.b, 1000);
  await f(b, 1000);

  const object = new Anonymous();
  object.say();

  const object2 = new base.default(base.default.name);
  object2.say();

  console.log("The path separator is:", path_1.sep);
  console.log("And by a default import, it is also:", path_2.sep);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
