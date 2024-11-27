// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Testing the ts-no-window rule.
 *
 */

import { createRuleTester } from "../ruleTester";
import rule from "../../src/rules/ts-no-window";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = createRuleTester();

ruleTester.run("ts-no-window", rule, {
  valid: [
    {
      code: "self.navigator",
      filename: "src/test.ts",
    },
    {
      code: '"quoted window should be fine"',
      filename: "src/test.ts",
    },
  ],
  invalid: [
    {
      code: "window.navigator",
      filename: "src/test.ts",
      errors: [
        {
          message: "`window` should not be used, please use `self` instead.",
        },
      ],
      output: "self.navigator",
    },
  ],
});
