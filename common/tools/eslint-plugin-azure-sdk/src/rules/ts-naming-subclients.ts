// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require client methods returning a subclient to have names prefixed suffixed with "get" and suffixed with "client".
 * @author Arpan Laha
 */

import { ClassDeclaration, Identifier, MethodDefinition } from "estree";
import { getPublicMethods, getRuleMetaData } from "../utils";
import { Rule } from "eslint";
import { TSESTree } from "@typescript-eslint/experimental-utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-naming-subclients",
    "require client methods returning a subclient to have names prefixed suffixed with 'get' and suffixed with 'client'"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    ({
      // callback functions

      "ClassDeclaration[id.name=/Client$/]": (node: ClassDeclaration): void => {
        const className = node.id!.name;

        getPublicMethods(node).forEach((method: MethodDefinition): void => {
          const TSFunction = method.value as TSESTree.FunctionExpression;

          // check for proper return type configuration
          if (
            TSFunction.returnType !== undefined &&
            TSFunction.returnType.typeAnnotation.type === "TSTypeReference"
          ) {
            const typeIdentifier = TSFunction.returnType.typeAnnotation.typeName as Identifier;
            const typeName = typeIdentifier.name;

            // if type is a client that isn't the class itself
            if (/Client$/.test(typeName) && typeName !== className) {
              const methodIdentifier = method.key as Identifier;
              const methodName = methodIdentifier.name;

              // report if not expected name
              if (methodName !== `get${typeName}`) {
                context.report({
                  node: method,
                  message: `${className}'s method ${methodName} returns a subclient of type ${typeName} and should be called get${typeName}`,
                });
              }
            }
          }
        });
      },
    } as Rule.RuleListener),
};
