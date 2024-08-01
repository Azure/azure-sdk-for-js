// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force main to point to a CommonJS or UMD module.
 *
 */

import { TSESTree } from "@typescript-eslint/utils";
import { VerifierMessages, createRule, getVerifiers, stripPath, isEsmPackage } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-main-is-cjs",
  meta: {
    type: "suggestion",
    docs: {
      description: "force package.json's main value to point to a CommonJS or UMD module",
    },
    messages: {
      ...VerifierMessages,
      MainNotLiteral: "main value in package.json is not a Literal",
      MainInvalid:
        "main is set to {{actual}} when it should be set to dist/index.js or dist/index.cjs",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const verifiers = getVerifiers(context, {
      outer: "main",
    });
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    if (isEsmPackage(context.filename)) {
      return {};
    }
    return {
      // check to see if main exists at the outermost level
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

      // check the node corresponding to main to see if its value is dist/index.js
      "ExpressionStatement > ObjectExpression > Property[key.value='main']": (
        node: TSESTree.Property,
      ): void => {
        if (node.value.type !== "Literal") {
          context.report({
            node: node.value,
            messageId: "MainNotLiteral",
          });
        }

        const nodeValue = node.value as TSESTree.Literal;
        const main = nodeValue.value as string;

        if (!/^(\.\/)?dist\/index\.(c)?js$/.test(main)) {
          context.report({
            node: nodeValue,
            messageId: "MainInvalid",
            data: {
              actual: main,
            },
            fix: (fixer) => fixer.replaceText(nodeValue, `"dist/index.js"`),
          });
        }
      },
    };
  },
});
