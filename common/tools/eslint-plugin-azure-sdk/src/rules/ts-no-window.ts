// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to forbid usage of window.
 */
import { createRule } from "../utils/ruleCreator";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-no-window",
  meta: {
    type: "suggestion",
    docs: {
      description: "forbid usage of window",
      recommended: "recommended",
    },
    messages: {
      useSelf: "`window` should not be used, please use `self` instead.",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    return {
      // report on any window identifiers
      Identifier: (node): void => {
        if (node.name === "window") {
          context.report({
            node: node,
            messageId: "useSelf",
            fix: (fixer) => fixer.replaceText(node, "self"),
          });
        }
      },
    };
  },
});
