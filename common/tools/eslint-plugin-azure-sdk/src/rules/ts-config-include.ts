// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force tsconfig.json's "include" value to at least contain "src/**\/*.ts", "test/**\/*.ts", and "samples-dev/**\/*.ts"
 * @author Wei Jun Tan
 */

import { ArrayExpression, Literal, Property } from "estree";
import { arrayToString, getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-config-include",
    "force tsconfig.json's 'include' value to at least contain 'src/**/*.ts', 'test/**/*.ts', and 'samples-dev/**/*.ts'",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "include",
    });
    return stripPath(context.getFilename()) === "tsconfig.json"
      ? ({
          // callback functions

          // check to see if include exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to include to see if its value contains "src/**/*.ts", "test/**/*.ts", and "samples-dev/**/*.ts"
          "ExpressionStatement > ObjectExpression > Property[key.value='include']": (
            node: Property
          ): void => {
            // check if the value is an array of literals
            if (node.value.type !== "ArrayExpression") {
              context.report({
                node: node.value,
                message: `include is not set to an array`,
              });
            }

            const nodeValue = node.value as ArrayExpression;

            const nonLiteral = nodeValue.elements.find(
              (element: any): boolean => element.type !== "Literal"
            );

            if (nonLiteral !== undefined && nonLiteral !== null) {
              context.report({
                node: nonLiteral,
                message: `include contains non-literal elements, literal strings are expected instead`,
              });
            }

            const expected = ["src/**/*.ts", "test/**/*.ts", "samples-dev/**/*.ts"];
            const candidateArray = nodeValue.elements as Literal[];
            const candidateValues = candidateArray.map(
              (candidate: Literal): unknown => candidate.value
            );

            // Check if the expected values is included in the array
            expected.forEach((value: unknown): void => {
              if (!candidateValues.includes(value)) {
                candidateValues.push(value);
              }
            });
            if (candidateValues.length > candidateArray.length) {
              context.report({
                node: nodeValue,
                message: `include does not contain ${arrayToString(candidateValues)}`,
                fix: (fixer: Rule.RuleFixer): Rule.Fix =>
                  fixer.replaceText(nodeValue, arrayToString(candidateValues)),
              });
            }
          },
        } as Rule.RuleListener)
      : {};
  },
};
