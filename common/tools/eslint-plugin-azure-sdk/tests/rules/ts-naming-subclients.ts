// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-naming-subclients rule.
 * @author Arpan Laha
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-naming-subclients";

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

ruleTester.run("ts-naming-subclients", rule, {
  valid: [
    // normal valid example
    {
      code: "class ExampleClient { getSubClient(): SubClient {}; };",
    },
    // bad name but returning the same class
    {
      code: "class ExampleClient { getExampleClient(): ExampleClient {}; };",
    },
    // bad name in a non-client class
    {
      code: "class Example { get(): SubClient {}; };",
    },
  ],
  invalid: [
    // single
    {
      code: "class ExampleClient { get(): SubClient {}; };",
      errors: [
        {
          message:
            "ExampleClient's method get returns a subclient of type SubClient and should be called getSubClient",
        },
      ],
    },
    // multiple
    {
      code: "class ExampleClient { get(): SubClient {}; get2(): SubSubClient {}; };",
      errors: [
        {
          message:
            "ExampleClient's method get returns a subclient of type SubClient and should be called getSubClient",
        },
        {
          message:
            "ExampleClient's method get2 returns a subclient of type SubSubClient and should be called getSubSubClient",
        },
      ],
    },
  ],
});
