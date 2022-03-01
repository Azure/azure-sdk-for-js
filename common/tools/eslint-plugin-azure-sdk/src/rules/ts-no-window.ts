// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to forbid usage of window.
 * @author Maor Leger
 */

import { Rule } from "eslint";
import { getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData("ts-no-window", "forbid usage of window", "code"),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    ({
      // report on any window identifiers
      "Identifier[name=window]": (node: any): void => {
        context.report({
          node: node,
          message: "`window` should not be used, please use `self` instead.",
          fix: (fixer: Rule.RuleFixer): Rule.Fix =>
            fixer.replaceTextRange([node.range[0], node.range[0] + "window".length], "self"),
        });
      },
    } as Rule.RuleListener),
};
