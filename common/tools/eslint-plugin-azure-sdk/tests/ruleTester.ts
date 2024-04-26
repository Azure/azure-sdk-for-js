// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as path from "node:path";
import * as vitest from "vitest";
import { RuleTester } from "@typescript-eslint/rule-tester";

RuleTester.afterAll = vitest.afterAll;

// If you are not using vitest with globals: true (https://vitest.dev/config/#globals):
RuleTester.it = vitest.it;
RuleTester.itOnly = vitest.it.only;
RuleTester.describe = vitest.describe;

export function createRuleTester() {
  const ruleTester = new RuleTester({
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
      tsconfigRootDir: path.join(__dirname, "./fixture"),
      project: "./tsconfig.json",
      extraFileExtensions: [".json"],
    },
  });
  return ruleTester;
}
