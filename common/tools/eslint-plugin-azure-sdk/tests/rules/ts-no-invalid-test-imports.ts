// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Testing the ts-no-invalid-test-imports rule.
 *
 */

import { createRuleTester } from "../ruleTester.js";
import rule from "../../src/rules/ts-no-invalid-test-imports.js";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

// Provide cwd pointing to the shared fixture root so the rule's context.getCwd() resolves there.
const testFile = "./tests/test.ts";
const nonTestFile = "./src/client.ts";
const ruleTester = createRuleTester();

ruleTester.run("ts-no-invalid-test-imports", rule, {
  valid: [
    // Package imports are always allowed
    {
      code: `import { something } from "@azure/identity";`,
      filename: testFile,
    },
    // Relative imports not to src are allowed
    {
      code: `import { something } from "../utils";`,
      filename: testFile,
    },
    // Internal imports are allowed
    {
      code: 'import { something } from "$internal";',
      filename: testFile,
    },
    // Local imports are allowed
    {
      code: `import { something } from "./helpers";`,
      filename: testFile,
    },
    // Non-test files are ignored
    {
      code: `import { something } from "./helpers";`,
      filename: nonTestFile,
    },
  ],

  invalid: [
    {
      code: `import { Client } from "../src/client";`,
      filename: testFile,
      errors: [{ messageId: "invalidImport" }],
    },
    {
      code: `import { Helper } from "../src/helpers/helper";`,
      filename: testFile,
      errors: [{ messageId: "invalidImport" }],
    },
  ],
});
