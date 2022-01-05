// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-apisurface-supportcancellation rule.
 * @author Arpan Laha
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-apisurface-supportcancellation";

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

ruleTester.run("ts-apifurface-supportcancellation", rule, {
  valid: [
    // parameter
    {
      code: "class ExampleClient { async createItem(cancelToken: AbortSignalLike): void {}; };",
    },
    // sync
    {
      code: "class ExampleClient { createItem(): void {}; };",
    },
    // private
    {
      code: "class ExampleClient { private async makeItem(): void {}; };",
    },
    // not client
    {
      code: "class Example { async makeItem(): void {}; };",
    },
  ],
  invalid: [
    {
      code: "class ExampleClient { async createItem(): void {}; };",
      errors: [
        {
          message: "async method createItem should accept an AbortSignalLike parameter or option",
        },
      ],
    },
  ],
});
