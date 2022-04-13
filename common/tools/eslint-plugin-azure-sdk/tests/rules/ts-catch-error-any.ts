// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Testing the ts-catch-error-any rule.
 */

import { RuleTester } from "eslint";
import rule from "../../src/rules/ts-catch-error-any";

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

ruleTester.run("ts-catch-error-any", rule, {
  valid: [
    {
      code: "try {} catch (e: unknown) {}",
    },
    {
      code: "try {} catch {}",
    },
    {
      code: "try {} catch (e: RestError) {}",
    },
    {
      code: "try {} catch (e: Error) {}",
    },
  ],
  invalid: [
    {
      code: "try {} catch (e: any) {}",
      errors: [
        {
          message: "please verify the usage of `any` type for the catch variable",
        },
      ],
    },
  ],
});
