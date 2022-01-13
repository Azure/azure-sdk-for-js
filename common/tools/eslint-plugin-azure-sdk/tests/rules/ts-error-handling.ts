// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-error-handling rule.
 * @author Arpan Laha
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-error-handling";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json",
  },
});

ruleTester.run("ts-error-handling", rule, {
  valid: [
    // different valid errors
    {
      code: 'throw new TypeError("test")',
      filename: "src/test.ts",
    },
    {
      code: 'throw new RangeError("test")',
      filename: "src/test.ts",
    },
    {
      code: 'throw new Error("test")',
      filename: "src/test.ts",
    },
    {
      code: 'const err = new TypeError("test"); throw err',
      filename: "src/test.ts",
    },
    {
      code: 'const err = new RangeError("test"); throw err',
      filename: "src/test.ts",
    },
    {
      code: 'const err = new Error("test"); throw err',
      filename: "src/test.ts",
    },
    {
      code: 'try { console.log("test"); } catch(err) { throw err; }',
      filename: "src/test.ts",
    },
  ],
  invalid: [
    // string-value exception
    {
      code: 'throw "test"',
      filename: "src/test.ts",
      errors: [
        {
          message: "statement is throwing a literal",
        },
      ],
    },
    // integer-value exception
    {
      code: "throw 1",
      filename: "src/test.ts",
      errors: [
        {
          message: "statement is throwing a literal",
        },
      ],
    },
    // user-defined exception
    {
      code: 'function UserException(message) { this.message = message; this.name = "UserException";}; throw new UserException("test")',
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type UserException of thrown error is not one of the allowed error types: TypeError, RangeError, Error",
        },
      ],
    },
    {
      code: 'class TestError extends Error { constructor(m: string) { super(m); }; } const err = new TestError("test"); throw err',
      filename: "src/test.ts",
      errors: [
        {
          message:
            "type TestError of thrown error is not one of the allowed error types: TypeError, RangeError, Error",
        },
      ],
    },
  ],
});
