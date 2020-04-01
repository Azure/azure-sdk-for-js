// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to forbid usage of TypeScript namespaces.
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData("ts-no-namespaces", "forbid usage of TypeScript namespaces"),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    ({
      // callback functions

      // report on any TSModuleDeclarations
      TSModuleDeclaration: (node: any): void => {
        context.report({
          node: node,
          message: "TypeScript namespaces should not be used"
        });
      }
    } as Rule.RuleListener)
};
