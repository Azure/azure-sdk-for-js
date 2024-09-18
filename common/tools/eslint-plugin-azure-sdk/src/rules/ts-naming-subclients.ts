// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to require client methods returning a subclient to have names prefixed suffixed with "get" and suffixed with "client".
 *
 */

import { getPublicMethods, createRule } from "../utils";
import { TSESTree } from "@typescript-eslint/utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-naming-subclients",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "require client methods returning a subclient to have names prefixed suffixed with 'get' and suffixed with 'client'",
    },
    messages: {
      BadSubclientMethodName:
        "{{className}}'s method {{methodName}} returns a subclient of type {{typeName}} and should be called get{{typeName}}",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    return {
      "ClassDeclaration[id.name=/Client$/]": (node: TSESTree.ClassDeclaration): void => {
        const className = node.id!.name;

        for (const method of getPublicMethods(node)) {
          const TSFunction = method.value as TSESTree.FunctionExpression;

          // check for proper return type configuration
          if (
            TSFunction.returnType !== undefined &&
            TSFunction.returnType.typeAnnotation.type === "TSTypeReference"
          ) {
            const typeIdentifier = TSFunction.returnType.typeAnnotation
              .typeName as TSESTree.Identifier;
            const typeName = typeIdentifier.name;

            // if type is a client that isn't the class itself
            if (/Client$/.test(typeName) && typeName !== className) {
              const methodIdentifier = method.key as TSESTree.Identifier;
              const methodName = methodIdentifier.name;

              // report if not expected name
              if (methodName !== `get${typeName}`) {
                context.report({
                  node: method,
                  messageId: "BadSubclientMethodName",
                  data: {
                    className,
                    methodName,
                    typeName,
                  },
                });
              }
            }
          }
        }
      },
    };
  },
});
