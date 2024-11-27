// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ESLintUtils } from "@typescript-eslint/utils";

export const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/Azure/azure-sdk-for-js/tree/main/common/tools/eslint-plugin-azure-sdk/docs/rules/${name}.md`,
);
