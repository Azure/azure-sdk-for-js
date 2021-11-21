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
   },
   settings: {
     exported: []
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
     // interface
     {
       code: `
             /**
              * Other documentation
              * @internal
              */
             interface ExampleInterface {}`,
       filename: "src/test.ts"
     },
     {
      code: `
            /**
             * Other documentation
             */
            private interface ExampleInterface {}`,
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
              private class ExampleClass {}`,
       filename: "src/test.ts",
       errors: [
         {
           message: "private class members should not include an @internal tag"
         }
       ]
     },
     // interface
     {
       code: `
             /**
              * Other documentation
              * @internal
              */
             private interface ExampleInterface {}`,
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
              */
             private function ExampleFunction() {}`,
       filename: "src/test.ts",
       errors: [
         {
           message: "private class members should not include an @internal tag"
         }
       ]
     }
   ]
 });
