// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to limit thrown errors to ECMAScript built-in error types (TypeError, RangeError, Error).
 *
 */

import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-error-handling",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "limit thrown errors to ECMAScript built-in error types (TypeError, RangeError, Error)",
    },
    messages: {
      ThrownLiteral: "statement is throwing a literal",
      DisallowedErrorType:
        "type {{type}} of thrown error is not one of the allowed error types: TypeError, RangeError, Error",
      DisallowedNewError:
        "type {{name}} of thrown error is not one of the allowed error types: TypeError, RangeError, Error",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    if (/src/.test(context.filename) === false) {
      return {};
    }
    return {
      // callback functions

      // if throwing a literal value
      "ThrowStatement[argument.type='Literal']": (node: TSESTree.ThrowStatement): void => {
        context.report({
          node,
          messageId: "ThrownLiteral",
        });
      },

      // if throwing an identifier
      "ThrowStatement[argument.type='Identifier']": (node: TSESTree.ThrowStatement): void => {
        const thrown = node.argument;
        if (!thrown) {
          return;
        }
        const parserServices = ESLintUtils.getParserServices(context);
        const typeChecker = parserServices.program.getTypeChecker();
        const converter = parserServices.esTreeNodeToTSNodeMap;
        const TSNode = converter.get(thrown as TSESTree.Node);
        const type = typeChecker.typeToString(typeChecker.getTypeAtLocation(TSNode));

        if (!["TypeError", "RangeError", "Error", "any"].includes(type)) {
          context.report({
            node: thrown,
            messageId: "DisallowedErrorType",
            data: {
              type,
            },
          });
        }
      },

      // if throwing new object
      "ThrowStatement[argument.type='NewExpression']": (node: TSESTree.ThrowStatement): void => {
        const argument = node.argument as unknown as TSESTree.NewExpression;
        const callee = argument.callee as TSESTree.Identifier;

        if (!["TypeError", "RangeError", "Error"].includes(callee.name)) {
          context.report({
            node: callee,
            messageId: "DisallowedNewError",
            data: {
              name: callee.name,
            },
          });
        }
      },
    };
  },
});
