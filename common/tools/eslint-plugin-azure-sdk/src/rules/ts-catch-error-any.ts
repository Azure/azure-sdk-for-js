// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to discourage usage of `any` as the catch variable type.
 */

import { CatchClause } from "estree";
import { ParserServices } from "@typescript-eslint/experimental-utils";
import { Rule } from "eslint";
import { getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-catch-error-any",
    "discourage usage of `any` as the catch variable type"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const parserServices = context.parserServices as ParserServices;
    if (
      parserServices.program === undefined ||
      parserServices.esTreeNodeToTSNodeMap === undefined
    ) {
      return {};
    }

    return {
      // callback functions

      // call on Client classes
      "CatchClause": (node: CatchClause): void => {
        // TODO: better to cast to a typescript node instead of `any`?
        if (node.param && (node.param as any).typeAnnotation?.typeAnnotation?.type === "TSAnyKeyword") {
          context.report({
            node: node.param!,
            message: "please verify the usage of `any` type for the catch variable",
          });
        }
      },
    } as Rule.RuleListener;
  },
};
