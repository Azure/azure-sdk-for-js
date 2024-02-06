// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to forbid usage of TypeScript's const enums.
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData("ts-no-const-enums", "forbid usage of TypeScript's const enums", "code"),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    ({
      // callback functions

      // check Enum to make sure it doesn't have a const keyword
      TSEnumDeclaration: (node: any): void => {
        if (node.const !== undefined) {
          context.report({
            node: node,
            message: "const enums should not be used",
            fix: (fixer: Rule.RuleFixer): Rule.Fix =>
              fixer.removeRange([node.range[0], node.range[0] + "const ".length]),
          });
        }
      },
    } as Rule.RuleListener),
};
