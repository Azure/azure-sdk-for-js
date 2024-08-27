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

export interface CreateRuleTesterOptions {
  settings?: Record<string, unknown>;
  testTsConfig?: boolean;
}

export function createRuleTester(options: CreateRuleTesterOptions = {}) {
  const project = options.testTsConfig ? "./tsconfig-alt.json" : "./tsconfig.json";
  const ruleTester = new RuleTester({
    languageOptions: {
      parserOptions: {
        projectServices: {
          allowDefaultProject: ["*.ts*"],
          defaultProject: "tsconfig.json",
        },
        tsconfigRootDir: path.join(__dirname, "./fixture"),
        project,
        extraFileExtensions: [".json"],
      },
    },
    settings: options.settings ?? {},
  });
  return ruleTester;
}
