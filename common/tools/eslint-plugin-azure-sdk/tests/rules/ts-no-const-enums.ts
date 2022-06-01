// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-no-const-enums rule.
 * @author Arpan Laha
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-no-const-enums";

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

ruleTester.run("ts-no-const-enums", rule, {
  valid: [
    {
      code: "enum Enum { a = 1 }",
      filename: "src/test.ts",
    },
  ],
  invalid: [
    {
      code: "const enum Enum { a = 1 }",
      filename: "src/test.ts",
      errors: [
        {
          message: "const enums should not be used",
        },
      ],
      output: "enum Enum { a = 1 }",
    },
  ],
});
