// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to forbid usage of TypeScript's const enums.
 */

import { createRule } from "../utils/ruleCreator.js";

export default createRule({
  name: "ts-no-const-enums",
  meta: {
    type: "suggestion",
    docs: {
      description: "forbid usage of TypeScript's const enums",
      recommended: "recommended",
    },
    messages: {
      noConstEnum: "const enums should not be used",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    return {
      // check Enum to make sure it doesn't have a const keyword
      TSEnumDeclaration: (node): void => {
        if (node.const) {
          context.report({
            node: node,
            messageId: "noConstEnum",
            fix: (fixer) => fixer.removeRange([node.range[0], node.range[0] + "const ".length]),
          });
        }
      },
    };
  },
});
