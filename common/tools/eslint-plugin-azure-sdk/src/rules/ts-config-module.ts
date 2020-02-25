// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force tsconfig.json's compilerOptions.module value to "es6".
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { Literal, Property } from "estree";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-config-module",
    "force tsconfig.json's compilerOptions.module value to be set to 'es6'",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "compilerOptions",
      inner: "module"
    });
    return stripPath(context.getFilename()) === "tsconfig.json"
      ? ({
          // callback functions

          // check to see if compilerOptions exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check that module is a member of compilerOptions
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions']":
            verifiers.isMemberOf,

          // check the node corresponding to compilerOptions.module to see if it is set to es6
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions'] > ObjectExpression > Property[key.value='module']": (
            node: Property
          ): void => {
            // check to see that node value is a Literal before casting
            if (node.value.type !== "Literal") {
              context.report({
                node: node.value,
                message:
                  "compilerOptions.module is not set to a literal (string | boolean | null | number | RegExp)",
                fix: (fixer: Rule.RuleFixer): Rule.Fix => fixer.replaceText(node.value, `"es6"`)
              });
            }

            const nodeValue = node.value as Literal;

            // check that module is set to es6
            const module = nodeValue.value as string;
            if (!/^es6$/i.test(module)) {
              context.report({
                node: node,
                message: `compilerOptions.module is set to ${module} when it should be set to ES6`,
                fix: (fixer: Rule.RuleFixer): Rule.Fix => fixer.replaceText(nodeValue, `"es6"`)
              });
            }
          }
        } as Rule.RuleListener)
      : {};
  }
};
