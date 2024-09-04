// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Testing the ts-naming-drop-noun rule.
 *
 */

import { createRuleTester } from "../ruleTester";
import rule from "../../src/rules/ts-naming-drop-noun";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = createRuleTester();

ruleTester.run("ts-naming-drop-noun", rule, {
  valid: [
    // single method
    {
      code: "class ExampleClient { create(): ExampleClient {}; };",
    },
    // multiple methods
    {
      code: "class ExampleClient { create(): ExampleClient {}; upsert(): ExampleClient {}; };",
    },
    // not a client
    {
      code: "class Example { createExample(): Example {}; };",
    },
  ],
  invalid: [
    // single violator
    {
      code: "class ExampleClient { createExample(): ExampleClient {}; };",
      errors: [
        {
          message:
            "ExampleClient's method createExample returns an instance of ExampleClient and shouldn't include Example in its name",
        },
      ],
    },
    // multiple violators
    {
      code: "class ExampleClient { createExample(): ExampleClient {}; upsertExample(): ExampleClient {}; };",
      errors: [
        {
          message:
            "ExampleClient's method createExample returns an instance of ExampleClient and shouldn't include Example in its name",
        },
        {
          message:
            "ExampleClient's method upsertExample returns an instance of ExampleClient and shouldn't include Example in its name",
        },
      ],
    },
  ],
});
