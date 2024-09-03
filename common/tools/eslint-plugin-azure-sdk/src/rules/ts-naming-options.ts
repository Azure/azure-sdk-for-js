// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to require client method option parameter type names to be suffixed with Options and prefixed with the class name if it is a class constructor and prefixed with the method name otherwise.
 *
 */

import { TSESTree } from "@typescript-eslint/utils";
import { getPublicMethods, createRule } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-naming-options",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "require client method option parameter type names to be suffixed with Options and prefixed with the method name",
    },
    messages: {
      UnprefixedParameter: "options parameter type is not prefixed with the {{prefixKind}} name",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    return {
      // call on Client classes
      "ClassDeclaration[id.name=/Client$/]": (node: TSESTree.ClassDeclaration): void => {
        for (const method of getPublicMethods(node)) {
          const methodIdentifier = method.key as TSESTree.Identifier;
          const TSFunction = method.value as TSESTree.FunctionExpression;
          const optionsRegex =
            // the null check will always succeed because we apply this only for
            // classes where id.name=/Client$/.
            method.kind === "constructor" && node.id !== null
              ? new RegExp(`${node.id.name}Options`, "i")
              : new RegExp(`${methodIdentifier.name}Options`, "i");
          // look for parameters with types suffixed with Options
          for (const param of TSFunction.params) {
            // checks to validate parameter
            if (param.type === "Identifier" && param.typeAnnotation !== undefined) {
              const typeAnnotation = param.typeAnnotation.typeAnnotation;
              if (
                typeAnnotation.type === "TSTypeReference" &&
                typeAnnotation.typeName.type === "Identifier"
              ) {
                const paramTypeName = typeAnnotation.typeName.name;
                if (paramTypeName.endsWith("Options")) {
                  // check that parameter is prefixed with method name
                  if (!optionsRegex.test(paramTypeName)) {
                    const prefixKind = method.kind === "constructor" ? "class" : "method";
                    context.report({
                      node: param,
                      messageId: "UnprefixedParameter",
                      data: {
                        prefixKind,
                      },
                    });
                  }
                }
              }
            }
          }
        }
      },
    };
  },
});
