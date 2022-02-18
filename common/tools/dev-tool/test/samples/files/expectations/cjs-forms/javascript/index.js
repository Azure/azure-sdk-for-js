// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary validates several forms of CommonJS imports
 */

const a = require("./hasDefaultExport").default,
  {
    // This comment is only here to make sure it still appears in the output
    b,
  } = require("./hasDefaultExport");

const c = require("./hasDefaultExport");

const f = require("./hasNamedDefaultExport").default;

const base = require("./defaultExportsNamedClass");
const Anonymous = require("./defaultExportsClass").default;

require("./hasSideEffects");

// Test builtins
const path_1 = require("path");
const path_2 = require("path");

const test1 = require("@azure/test1").default,
  { x: x1 } = require("@azure/test1");
const test2 = require("@azure-test2/test2").default,
  { x: x2 } = require("@azure-test2/test2");

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
