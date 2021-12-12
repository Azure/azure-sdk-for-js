// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-doc-internal-private-member rule.
 * @author Hamsa Shankar
 */

import rule from "../../src/rules/ts-doc-internal-private-member";
import { RuleTester } from "eslint";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json"
  }
});

ruleTester.run("ts-doc-internal-private-member", rule, {
  valid: [
    // class
    {
      code: `
             /**
              * Other documentation
              * @internal
              */
             class ExampleClass {}`,
      filename: "src/test.ts"
    },
    {
      code: `
            /**
             * Other documentation
             */
            private class ExampleClass {}`,
      filename: "src/test.ts"
    },
    // function
    {
      code: `
             /**
              * Other documentation
              * @internal
              */
             function ExampleFunction() {}`,
      filename: "src/test.ts"
    },
    {
      code: `
             /**
              * Other documentation
              */
             private function ExampleFunction() {}`,
      filename: "src/test.ts"
    }
  ],
  invalid: [
    // class
    {
      code: `
             /**
              * Other documentation
              * @internal
              */
              private class ExampleClass {

              }`,
      filename: "src/test.ts",
      errors: [
        {
          message: "private class members should not include an @internal tag"
        }
      ]
    },
    // function
    {
      code: `
             /**
              * Other documentation
              * @internal
              * @param {object} len - length
              */
             private function ExampleFunction(len) {}`,
      filename: "src/test.ts",
      errors: [
        {
          message: "private class members should not include an @internal tag"
        }
      ]
    }
  ]
});
