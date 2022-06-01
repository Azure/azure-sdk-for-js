// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require client methods returning an instance of the client to not include the client name in the method name.
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
    "ts-naming-drop-noun",
    "require client methods returning an instance of the client to not include the client name in the method name"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    ({
      // callback functions

      // call on Client classes
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

            // if return type is the class
            if (typeIdentifier.name === className) {
              const methodIdentifier = method.key as Identifier;
              const methodName = methodIdentifier.name;
              const serviceName = className.substring(0, className.indexOf("Client"));
              const regex = new RegExp(serviceName, "i");

              // report if method name contains the non-client portion of the class name
              if (regex.test(methodName)) {
                context.report({
                  node: method,
                  message: `${className}'s method ${methodName} returns an instance of ${className} and shouldn't include ${serviceName} in its name`,
                });
              }
            }
          }
        });
      },
    } as Rule.RuleListener),
};
