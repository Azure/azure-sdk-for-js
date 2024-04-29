// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force tsconfig.json's "include" value to at least contain "src/**\/*.ts", "test/**\/*.ts", and "samples-dev/**\/*.ts"
 *
 */

import { TSESTree } from "@typescript-eslint/utils";
import { VerifierMessages, arrayToString, createRule, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-config-include",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "force tsconfig.json's 'include' value to at least contain 'src/**/*.ts', 'test/**/*.ts', and 'samples-dev/**/*.ts'",
      recommended: "recommended",
    },
    messages: {
      ...VerifierMessages,
      IncludeNotArray: "include is not set to an array",
      IncludeNonLiteral:
        "include contains non-literal elements, literal strings are expected instead",
      IncludeMissingItems: "include does not contain {{MissingItems}}",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const verifiers = getVerifiers(context, {
      outer: "include",
    });

    if (stripPath(context.filename) !== "tsconfig.json") {
      return {};
    }
    return {
      // callback functions

      // check to see if include exists at the outermost level
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

      // check the node corresponding to include to see if its value contains "src/**/*.ts", "test/**/*.ts", and "samples-dev/**/*.ts"
      "ExpressionStatement > ObjectExpression > Property[key.value='include']": (
        node: TSESTree.Property,
      ): void => {
        // check if the value is an array of literals
        if (node.value.type !== "ArrayExpression") {
          context.report({
            node: node.value,
            messageId: "IncludeNotArray",
          });
        }

        const nodeValue = node.value as TSESTree.ArrayExpression;

        const nonLiteral = nodeValue.elements.find(
          (element): boolean => element?.type !== "Literal",
        );

        if (nonLiteral !== undefined && nonLiteral !== null) {
          context.report({
            node: nonLiteral,
            messageId: "IncludeNonLiteral",
          });
        }

        const expected = ["src/**/*.ts", "test/**/*.ts", "samples-dev/**/*.ts"];
        const candidateArray = nodeValue.elements as TSESTree.Literal[];
        const candidateValues = candidateArray.map<unknown>((candidate) => candidate.value);

        // Check if the expected values is included in the array
        for (const value of expected) {
          if (!candidateValues.includes(value)) {
            candidateValues.push(value);
          }
        }
        if (candidateValues.length > candidateArray.length) {
          context.report({
            node: nodeValue,
            messageId: "IncludeMissingItems",
            data: {
              MissingItems: arrayToString(candidateValues),
            },
            fix: (fixer) => fixer.replaceText(nodeValue, arrayToString(candidateValues)),
          });
        }
      },
    };
  },
});
