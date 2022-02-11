// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-doc-internal-private-member rule.
 * @author Hamsa Shankar
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-doc-internal-private-member";

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
    // all private
    {
      code: `
             /**
              * Class documentation
              */
              class ExampleClass {
                /**
                 * Class Property
                 */
                private x = 0;

                /**
                 * Property Signature
                 */
                private y: number;

                /**
                * Index signature
                */
                private [s: string]: boolean | ((s: string) => boolean);

                /**
                 * Parameter Property
                 */
                private testMethod(private x: number, private y: number) {}

                /**
                 * Method Definition
                 */
                private get getter(): number { return 0 }

                /**
                 * Method Signature
                 */
                private method1(): any;

              }`,
      filename: "src/test.ts"
    },
    // all internal
    {
      code: `
            /**
              * Class documentation
              */
              class ExampleClass {
                /**
                 * Class Property
                 * @internal
                 */
                x = 0;

                /**
                 * Property Signature
                 * @internal
                 */
                y: number;

                /**
                * Index signature
                * @internal
                */
                [s: string]: boolean | ((s: string) => boolean);

                /**
                 * Parameter Property
                 * @internal
                 */
                testMethod(private x: number, private y: number) {}

                /**
                 * Method Definition
                 * @internal
                 */
                get getter(): number { return 0 }

                /**
                 * Method Signature
                 * @internal
                 */
                 method1(): any;
              }`,
      filename: "src/test.ts"
    }
  ],
  invalid: [
    {
      code: `
             /**
              * Class documentation
              */
              class ExampleClass {
                /**
                 * Class Property
                 * @internal
                 */
                private x = 0;

                /**
                 * Property Signature
                 * @internal
                 */
                private y: number;

                /**
                 * Index signature
                 * @internal
                 */
                private [s: string]: boolean | ((s: string) => boolean);

                /**
                 * Parameter Property
                 * @internal
                 */
                private testMethod(private x: number, private y: number) {}

                /**
                 * Method Definition
                 * @internal
                 */
                private get getter(): number { return 0 }

                /**
                 * Method Signature
                 * @internal
                 */
                private method1(): any;

              }`,
      filename: "src/test.ts",
      errors: [
        {
          message: "private class members should not include an @internal tag"
        },
        {
          message: "private class members should not include an @internal tag"
        },
        {
          message: "private class members should not include an @internal tag"
        },
        {
          message: "private class members should not include an @internal tag"
        },
        {
          message: "private class members should not include an @internal tag"
        },
        {
          message: "private class members should not include an @internal tag"
        }
      ]
    }
  ]
});
