// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Utilities relating to ESLint Rule metadata
 * @author Arpan Laha
 */

import { JSONSchema4 } from "json-schema";
import { Rule } from "eslint";

export const getRuleMetaData = (
  ruleName: string,
  ruleDescription: string,
  fix?: "code" | "whitespace",
  schema?: JSONSchema4 | JSONSchema4[]
): Rule.RuleMetaData => {
  const required = {
    type: "suggestion",
    docs: {
      description: ruleDescription,
      category: "Best Practices",
      recommended: true,
      url: `https://github.com/Azure/azure-sdk-for-js/tree/main/common/tools/eslint-plugin-azure-sdk/docs/rules/${ruleName}.md`,
    },
    schema: schema || [],
  };
  return (fix !== undefined ? { ...required, fixable: fix } : required) as Rule.RuleMetaData;
};
