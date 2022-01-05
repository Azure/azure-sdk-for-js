// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-use-promises rule.
 * @author Arpan Laha
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-use-promises";

//------------------------------------------------------------------------------
// Example files
//------------------------------------------------------------------------------

const example = `
const promise = (): Promise<string> => {
    return new Promise(resolve => resolve("example"));
}
`;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    createDefaultProgram: true,
    ecmaFeatures: {
      modules: true,
    },
    ecmaVersion: 6,
    project: "./tsconfig.json",
    sourceType: "module",
  },
});

ruleTester.run("ts-use-promises", rule, {
  valid: [
    {
      code: example,
    },
  ],
  invalid: [
    // this could should be uncommented after this issue has been fixed:
    // https://github.com/Azure/azure-sdk-for-js/issues/13186
    // {
    //   code: `import Promise from 'bluebird';${example}`,
    //   errors: [
    //     {
    //       message: "promises should use the in-built Promise type, not libraries or polyfills"
    //     }
    //   ]
    // }
  ],
});
