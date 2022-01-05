// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to limit thrown errors to ECMAScript built-in error types (TypeError, RangeError, Error).
 * @author Arpan Laha
 */

import { Identifier, NewExpression, ThrowStatement } from "estree";
import { ParserServices, TSESTree } from "@typescript-eslint/experimental-utils";
import { Rule } from "eslint";
import { getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-error-handling",
    "limit thrown errors to ECMAScript built-in error types (TypeError, RangeError, Error)"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    /src/.test(context.getFilename())
      ? ({
          // callback functions

          // if throwing a literal value
          "ThrowStatement[argument.type='Literal']": (node: ThrowStatement): void => {
            context.report({
              node: node,
              message: "statement is throwing a literal",
            });
          },

          // if throwing an identifier
          "ThrowStatement[argument.type='Identifier']": (node: ThrowStatement): void => {
            const thrown = node.argument as Identifier;
            const parserServices = context.parserServices as ParserServices;
            if (
              parserServices.program === undefined ||
              parserServices.esTreeNodeToTSNodeMap === undefined
            ) {
              return;
            }
            const typeChecker = parserServices.program.getTypeChecker();
            const TSNode = parserServices.esTreeNodeToTSNodeMap.get(thrown as TSESTree.Node);
            const type = typeChecker.typeToString(typeChecker.getTypeAtLocation(TSNode));

            if (!["TypeError", "RangeError", "Error", "any"].includes(type)) {
              context.report({
                node: thrown,
                message: `type ${type} of thrown error is not one of the allowed error types: TypeError, RangeError, Error`,
              });
            }
          },

          // if throwing new object
          "ThrowStatement[argument.type='NewExpression']": (node: ThrowStatement): void => {
            const argument = node.argument as NewExpression;
            const callee = argument.callee as Identifier;

            if (!["TypeError", "RangeError", "Error"].includes(callee.name)) {
              context.report({
                node: callee,
                message: `type ${callee.name} of thrown error is not one of the allowed error types: TypeError, RangeError, Error`,
              });
            }
          },
        } as Rule.RuleListener)
      : {},
};
