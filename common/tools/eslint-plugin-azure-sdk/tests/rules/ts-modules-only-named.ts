// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Testing the ts-modules-only-named rule.
 *
 */

import { createRuleTester } from "../ruleTester";
import rule from "../../src/rules/ts-modules-only-named";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = createRuleTester({ settings: { main: "src/test.ts" } });

ruleTester.run("ts-modules-only-named", rule, {
  valid: [
    // different non-default exports
    {
      code: 'export = {test: "test"}',
      filename: "src/test.ts",
    },
    {
      code: 'const foo = {test: "test"}; export {foo}',
      filename: "src/test.ts",
    },
    {
      code: 'export const foo = {test: "test"}',
      filename: "src/test.ts",
    },
    // invalid but in a file we dont care about
    {
      code: 'export default {test: "test"}',
      filename: "file.ts",
    },
  ],
  invalid: [
    // {
    //   code: 'export default {test: "test"}',
    //   filename: "src/test.ts",
    //   errors: [
    //     {
    //       message: "Exports at top level should be named",
    //     },
    //   ],
    // },
    // {
    //   code: 'const foo = {test: "test"}; export default foo',
    //   filename: "src/test.ts",
    //   errors: [
    //     {
    //       message: "Exports at top level should be named",
    //     },
    //   ],
    // },
  ],
});
