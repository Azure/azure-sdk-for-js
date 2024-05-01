// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-doc-internal rule.
 * @author Arpan Laha
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-doc-internal";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json",
  },
  settings: {
    exported: [],
  },
});

ruleTester.run("ts-doc-internal", rule, {
  valid: [
    // class
    {
      code: `
            /**
             * Other documentation
             * @internal
             */
            class ExampleClass {}`,
      filename: "src/test.ts",
    },
    {
      code: `
            /**
             * Other documentation
             * @hidden
             */
            class ExampleClass {}`,
      filename: "src/test.ts",
    },
    // interface
    {
      code: `
            /**
             * Other documentation
             * @internal
             */
            interface ExampleInterface {}`,
      filename: "src/test.ts",
    },
    {
      code: `
            /**
             * Other documentation
             * @hidden
             */
            interface ExampleInterface {}`,
      filename: "src/test.ts",
    },
    // function
    {
      code: `
            /**
             * Other documentation
             * @internal
             */
            function ExampleFunction() {}`,
      filename: "src/test.ts",
    },
    {
      code: `
            /**
             * Other documentation
             * @hidden
             */
            function ExampleFunction() {}`,
      filename: "src/test.ts",
    },
  ],
  invalid: [
    // class
    {
      code: `
            /**
             * Other documentation
             */
            class ExampleClass {}`,
      filename: "src/test.ts",
      errors: [
        {
          message: "internal items with TSDoc comments should include an @internal or @hidden tag",
        },
      ],
    },
    // interface
    {
      code: `
            /**
             * Other documentation
             */
            interface ExampleInterface {}`,
      filename: "src/test.ts",
      errors: [
        {
          message: "internal items with TSDoc comments should include an @internal or @hidden tag",
        },
      ],
    },
    // function
    {
      code: `
            /**
             * Other documentation
             * @ignore
             */
            function ExampleFunction() {}`,
      filename: "src/test.ts",
      errors: [
        {
          message: "internal items with TSDoc comments should include an @internal or @hidden tag",
        },
      ],
    },
  ],
});
