// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-no-const-enums rule.
 *
 */

import { createRuleTester } from "../ruleTester";
import rule from "../../src/rules/ts-no-const-enums";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = createRuleTester();

ruleTester.run("ts-no-const-enums", rule, {
  valid: [
    {
      code: "enum Example { a = 1 }",
      filename: "src/test.ts",
    },
  ],
  invalid: [
    {
      code: "const enum Example { a = 1 }",
      filename: "src/test.ts",
      errors: [
        {
          message: "const enums should not be used",
        },
      ],
      output: "enum Example { a = 1 }",
    },
  ],
});
