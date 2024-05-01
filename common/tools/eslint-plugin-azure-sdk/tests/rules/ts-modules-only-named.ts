// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-modules-only-named rule.
 * @author Arpan Laha
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-modules-only-named";

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

ruleTester.run("ts-modules-only-named", rule, {
  valid: [
    // different non-default exports
    {
      code: 'export = {test: "test"}',
      filename: "test.ts",
    },
    {
      code: 'const foo = {test: "test"}; export {foo}',
      filename: "test.ts",
    },
    {
      code: 'export const foo = {test: "test"}',
      filename: "test.ts",
    },
    // invalid but in a file we dont care about
    {
      code: 'export default {test: "test"}',
      filename: "notTest.ts",
    },
  ],
  invalid: [
    {
      code: 'export default {test: "test"}',
      filename: "test.ts",
      errors: [
        {
          message: "default exports exist at top level",
        },
      ],
    },
    {
      code: 'const foo = {test: "test"}; export default foo',
      filename: "test.ts",
      errors: [
        {
          message: "default exports exist at top level",
        },
      ],
    },
  ],
});
