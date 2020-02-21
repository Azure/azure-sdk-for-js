// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force tsconfig.json's compilerOptions.lib value to be an empty array.
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { ArrayExpression, Property } from "estree";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-config-lib",
    "force tsconfig.json's compilerOptions.lib value to be an empty array",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "compilerOptions",
      inner: "lib"
    });
    return stripPath(context.getFilename()) === "tsconfig.json"
      ? ({
          // callback functions

          // check to see if compilerOptions exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check that lib is a member of compilerOptions
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions']":
            verifiers.isMemberOf,

          // check the node corresponding to compilerOptions.lib to see if it is set to an empty array
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions'] > ObjectExpression > Property[key.value='lib']": (
            node: Property
          ): void => {
            if (node.value.type === "ArrayExpression") {
              const nodeValue = node.value as ArrayExpression;
              if (nodeValue.elements.length !== 0) {
                context.report({
                  node: nodeValue,
                  message: "compilerOptions.lib is not set to an empty array",
                  fix: (fixer: Rule.RuleFixer): Rule.Fix => fixer.replaceText(nodeValue, "[]")
                });
              }
            } else {
              context.report({
                node: node.value,
                message: "compilerOptions.lib is not set to an empty array",
                fix: (fixer: Rule.RuleFixer): Rule.Fix => fixer.replaceText(node.value, "[]")
              });
            }
          }
        } as Rule.RuleListener)
      : {};
  }
};
