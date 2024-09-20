// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to require client methods returning an instance of the client to not include the client name in the method name.
 *
 */

import { getPublicMethods, createRule } from "../utils";
import { TSESTree } from "@typescript-eslint/utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-naming-drop-noun",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "require client methods returning an instance of the client to not include the client name in the method name",
    },
    messages: {
      ClassNameInMethodName:
        "{{className}}'s method {{methodName}} returns an instance of {{className}} and shouldn't include {{serviceName}} in its name",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    return {
      // call on Client classes
      "ClassDeclaration[id.name=/Client$/]": (node: TSESTree.ClassDeclaration): void => {
        const className = node.id!.name;

        for (const method of getPublicMethods(node)) {
          const TSFunction = method.value;

          // check for proper return type configuration
          if (
            TSFunction.returnType !== undefined &&
            TSFunction.returnType.typeAnnotation.type === "TSTypeReference"
          ) {
            const typeIdentifier = TSFunction.returnType.typeAnnotation
              .typeName as TSESTree.Identifier;

            // if return type is the class
            if (typeIdentifier.name === className) {
              const methodIdentifier = method.key as TSESTree.Identifier;
              const methodName = methodIdentifier.name;
              const serviceName = className.substring(0, className.indexOf("Client"));
              const regex = new RegExp(serviceName, "i");

              // report if method name contains the non-client portion of the class name
              if (regex.test(methodName)) {
                context.report({
                  node: method,
                  messageId: "ClassNameInMethodName",
                  data: {
                    className,
                    methodName,
                    serviceName,
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
