// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-pagination-list rule.
 * @author Arpan Laha
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-pagination-list";

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

ruleTester.run("ts-pagination-list", rule, {
  valid: [
    // simple valid example
    {
      code: "class ExampleClient { listItems(): PagedAsyncIterableIterator<Item> {}; };",
    },
    // not a client
    {
      code: "class Example { listItems(): void {}; };",
    },
  ],
  invalid: [
    // no return type
    {
      code: "class ExampleClient { listItems() {} };",
      errors: [
        {
          message: "list method does not have a return type",
        },
      ],
    },
    // not a PagedAsyncIterableIterator
    {
      code: "class ExampleClient { listItems(): PagedIterableIterator {} };",
      errors: [
        {
          message: "list method does not return a PagedAsyncIterableIterator",
        },
      ],
    },
  ],
});
