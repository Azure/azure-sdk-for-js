// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Testing the ts-apisurface-supportcancellation rule.
 *
 */

import { createRuleTester } from "../ruleTester";
import rule from "../../src/rules/ts-apisurface-supportcancellation";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = createRuleTester();

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
