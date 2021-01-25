// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Utilities relating to ESLint Rule metadata
 * @author Arpan Laha
 */

import { Rule } from "eslint";

export const getRuleMetaData = (
  ruleName: string,
  ruleDescription: string,
  fix?: "code" | "whitespace"
): Rule.RuleMetaData => {
  const required = {
    type: "suggestion",
    docs: {
      description: ruleDescription,
      category: "Best Practices",
      recommended: true,
      url: `https://github.com/Azure/azure-sdk-for-js/tree/master/common/tools/eslint-plugin-azure-sdk/docs/rules/${ruleName}.md`
    },
    schema: []
  };
  return (fix !== undefined ? { ...required, fixable: fix } : required) as Rule.RuleMetaData;
};
