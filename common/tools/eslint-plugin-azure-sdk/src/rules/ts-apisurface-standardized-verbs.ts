// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require client methods to use standardized verb prefixes and suffixes where possible.
 */

import { getPublicMethods } from "../utils/index.js";
import { createRule } from "../utils/ruleCreator.js";
import { TSESTree, ASTUtils } from "@typescript-eslint/utils";

/**
 * A list of regexes corresponding to banned verb prefixes
 * Needs updating as definitions change
 */

const bannedPrefixes = [
  "make",
  "updateOrInsert",
  "insertOrUpdate",
  "push",
  "pop",
  "getAll",
  "erase",
  "fetch",
];

export default createRule({
  name: "ts-apisurface-standardized-verbs",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "require client methods to use standardized verb prefixes and suffixes where possible",
      recommended: "recommended",
    },
    messages: {
      bannedPrefix:
        "method {{methodName}} uses the banned prefix {{usedPrefix}}, use one of the approved prefixes instead",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    return {
      // call on Client classes
      "ClassDeclaration[id.name=/Client$/]": (node: TSESTree.ClassDeclaration): void => {
        for (const method of getPublicMethods(node)) {
          const methodName = ASTUtils.getPropertyName(method) ?? "";
          // look for if any of the banned prefixes are used
          const usedPrefix = bannedPrefixes.find((bannedPrefix: string): boolean =>
            methodName.startsWith(bannedPrefix),
          );
          if (usedPrefix !== undefined) {
            context.report({
              node: method,
              messageId: "bannedPrefix",
              data: {
                methodName,
                usedPrefix,
              },
            });
          }
        }
      },
    };
  },
});
