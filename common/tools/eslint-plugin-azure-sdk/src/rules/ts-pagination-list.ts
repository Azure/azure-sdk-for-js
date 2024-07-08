// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require client list methods to return a PagedAsyncIterableIterator.
 *
 */

import { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-pagination-list",
  meta: {
    type: "suggestion",
    docs: {
      description: "require client list methods to return a PagedAsyncIterableIterator",
      recommended: "recommended",
    },
    messages: {
      NoReturnType: "list method does not have a return type",
      NotAsyncIterator: "list method does not return a PagedAsyncIterableIterator",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    // call on Client classes
    return {
      "ClassDeclaration[id.name=/Client$/] MethodDefinition[key.name=/^list($|([A-Z][a-zA-Z]*s$))/]":
        (node: TSESTree.MethodDefinition): void => {
          // check for return type existence
          const TSFunction = node.value as TSESTree.FunctionExpression;
          if (
            TSFunction.returnType === undefined ||
            TSFunction.returnType.typeAnnotation.type !== "TSTypeReference"
          ) {
            return context.report({
              node,
              messageId: "NoReturnType",
            });
          }

          // report if return type is not PagedAsyncIterableIterator
          const typeIdentifier = TSFunction.returnType.typeAnnotation
            .typeName as TSESTree.Identifier;
          if (typeIdentifier.name !== "PagedAsyncIterableIterator") {
            context.report({
              node,
              messageId: "NotAsyncIterator",
            });
          }
        },
    };
  },
});
