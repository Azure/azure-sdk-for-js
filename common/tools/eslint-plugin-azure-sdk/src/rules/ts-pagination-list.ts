// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require client list methods to return a PagedAsyncIterableIterator.
 * @author Arpan Laha
 */

import { Identifier, MethodDefinition } from "estree";
import { Rule } from "eslint";
import { TSESTree } from "@typescript-eslint/experimental-utils";
import { getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-pagination-list",
    "require client list methods to return a PagedAsyncIterableIterator"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    ({
      // callback functions

      // call on Client classes
      "ClassDeclaration[id.name=/Client$/] MethodDefinition[key.name=/^list($|([A-Z][a-zA-Z]*s$))/]":
        (node: MethodDefinition): void => {
          // check for return type existence
          const TSFunction = node.value as TSESTree.FunctionExpression;
          if (
            TSFunction.returnType === undefined ||
            TSFunction.returnType.typeAnnotation.type !== "TSTypeReference"
          ) {
            context.report({
              node: node,
              message: "list method does not have a return type",
            });
            return;
          }

          // report if return type is not PagedAsyncIterableIterator
          const typeIdentifier = TSFunction.returnType.typeAnnotation.typeName as Identifier;
          if (typeIdentifier.name !== "PagedAsyncIterableIterator") {
            context.report({
              node: node,
              message: "list method does not return a PagedAsyncIterableIterator",
            });
          }
        },
    } as Rule.RuleListener),
};
