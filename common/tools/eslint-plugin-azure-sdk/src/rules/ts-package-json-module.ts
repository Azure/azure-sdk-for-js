// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to force module to be the ES6 entrypoint to the application.
 *
 */

import { TSESTree } from "@typescript-eslint/utils";
import { VerifierMessages, createRule, getVerifiers, stripPath, isEsmPackage } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-module",
  meta: {
    type: "suggestion",
    docs: {
      description: "force package.json's module value to be the ES6 entrypoint to the application",
    },
    messages: {
      ...VerifierMessages,
      ModuleNotLiteral: "module property in package.json is not a Literal",
      ModuleNotValid:
        "module is set to {{moduleValue}} when it should be set to dist-esm/src/index.js",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const verifiers = getVerifiers(context, {
      outer: "module",
    });
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    if (isEsmPackage(context.filename)) {
      return {};
    }
    return {
      // check to see if module exists at the outermost level
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

      // check the node corresponding to module to see if its value is dist-esm/src/index.js
      "ExpressionStatement > ObjectExpression > Property[key.value='module']": (
        node: TSESTree.Property,
      ): void => {
        if (node.value.type !== "Literal") {
          context.report({
            node: node.value,
            messageId: "ModuleNotLiteral",
          });
        }

        const nodeValue = node.value as TSESTree.Literal;
        const moduleValue = nodeValue.value as string;

        if (!/^(\.\/)?dist-esm\/src\/index\.js$/.test(moduleValue)) {
          context.report({
            node: nodeValue,
            messageId: "ModuleNotValid",
            data: {
              moduleValue,
            },
            fix: (fixer) => fixer.replaceText(nodeValue, `"dist-esm/src/index.js"`),
          });
        }
      },
    };
  },
});
