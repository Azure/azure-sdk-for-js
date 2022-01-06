// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-no-window rule.
 * @author Maor Leger
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-no-window";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json",
    sourceType: "module",
  },
  settings: {
    main: "test.ts",
  },
});

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
