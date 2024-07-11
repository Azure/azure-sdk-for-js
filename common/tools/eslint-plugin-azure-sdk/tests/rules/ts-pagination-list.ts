// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-pagination-list rule.
 *
 */

import { createRuleTester } from "../ruleTester";
import rule from "../../src/rules/ts-pagination-list";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = createRuleTester();

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
