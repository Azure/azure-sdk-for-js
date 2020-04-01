// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force tsconfig.json's compilerOptions.target value to be a valid EcmaScript standard.
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { Property } from "estree";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-config-target",
    "force tsconfig.json's compilerOptions.target value to be a valid EcmaScript standard"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "compilerOptions",
      inner: "target"
    });
    return stripPath(context.getFilename()) === "tsconfig.json"
      ? ({
          // callback functions

          // check to see if compilerOptions exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check that target is a member of compilerOptions
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions']":
            verifiers.isMemberOf,

          // check the node corresponding to compilerOptions.target to see if it is set to true
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions'] > ObjectExpression > Property[key.value='target']": (
            node: Property
          ): void => {
            // check that the value of target is a literal
            if (node.value.type !== "Literal") {
              context.report({
                node: node.value,
                message: "compilerOptions.target is not set to a string"
              });
              return;
            }

            const nodeValue = node.value;
            const target = nodeValue.value as string;

            // check that target is not set to an invalid EcmaScript standard (ES3 or ESNext)
            if (/es3/i.test(target)) {
              context.report({
                node: nodeValue,
                message: "ES3 is not a valid option for compilerOptions.target"
              });
            }

            if (/esnext/i.test(target)) {
              context.report({
                node: nodeValue,
                message: "ESNext is not a valid option for compilerOptions.target"
              });
            }
          }
        } as Rule.RuleListener)
      : {};
  }
};
