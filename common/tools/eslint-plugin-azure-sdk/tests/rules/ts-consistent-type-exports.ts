// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Testing the ts-consistent-type-exports rule.
 */

import { createRuleTester } from "../ruleTester.js";
import rule from "../../src/rules/ts-consistent-type-exports.js";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = createRuleTester();

ruleTester.run("ts-consistent-type-exports", rule, {
  valid: [
    // export * should be ignored even when all exports are types
    {
      code: `
        export type MyType = string;
        export * from "./other";
      `,
    },
    // export type * is fine
    {
      code: `
        export type * from "./other";
      `,
    },
    // named type exports with type keyword are fine
    {
      code: `
        type Foo = string;
        export type { Foo };
      `,
    },
    // value exports are fine
    {
      code: `
        const foo = 1;
        export { foo };
      `,
    },
  ],
  invalid: [
    // named exports of types without `type` keyword should still be flagged
    {
      code: `
        type Foo = string;
        export { Foo };
      `,
      output: `
        type Foo = string;
        export type { Foo };
      `,
      errors: [{ messageId: "typeOverValue" as const }],
    },
  ],
});
