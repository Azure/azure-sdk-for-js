// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Testing the ts-no-direct-child-process rule.
 */

import { createRuleTester } from "../ruleTester.js";
import rule from "../../src/rules/ts-no-direct-child-process.js";

const ruleTester = createRuleTester();

ruleTester.run("ts-no-direct-child-process", rule, {
  valid: [
    {
      code: `import type { ChildProcess } from "node:child_process";`,
      filename: "src/client.ts",
    },
    {
      code: `import { fork, type ChildProcess } from "node:child_process";`,
      filename: "src/client.ts",
    },
    {
      code: `import { fork as createWorker } from "child_process";`,
      filename: "src/client.ts",
    },
    {
      code: `import { spawn } from "@azure/core-process";`,
      filename: "src/client.ts",
    },
    {
      code: `import { spawn } from "node:child_process";`,
      filename: "core-process/src/client.ts",
    },
  ],
  invalid: [
    {
      code: `import { spawn } from "node:child_process";`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
    {
      code: `import { exec as execute } from "child_process";`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
    {
      code: `import * as childProcess from "node:child_process";`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
    {
      code: `import childProcess from "child_process";`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
    {
      code: `export { spawn } from "node:child_process";`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
    {
      code: `export * from "child_process";`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
    {
      code: `const childProcess = require("node:child_process");`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
    {
      code: `const childProcess = module["require"](\`child_process\`);`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
    {
      code: `const childProcess = process.getBuiltinModule("node:child_process");`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
    {
      code: `const childProcess = await import("child_process");`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
    {
      code: `import childProcess = require("node:child_process");`,
      filename: "src/client.ts",
      errors: [{ messageId: "useCoreProcess" }],
    },
  ],
});
