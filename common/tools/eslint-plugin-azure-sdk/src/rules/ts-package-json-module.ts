// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force module to be the ES6 entrypoint to the application.
 * @author Arpan Laha
 */

import { Literal, Property } from "estree";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-module",
    "force package.json's module value to be the ES6 entrypoint to the application",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "module",
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if module exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to module to see if its value is dist-esm/src/index.js
          "ExpressionStatement > ObjectExpression > Property[key.value='module']": (
            node: Property
          ): void => {
            if (node.value.type !== "Literal") {
              context.report({
                node: node.value,
                message: "name is not a Literal",
              });
            }

            const nodeValue = node.value as Literal;
            const moduleValue = nodeValue.value as string;

            if (!/^(\.\/)?dist-esm\/src\/index\.js$/.test(moduleValue)) {
              context.report({
                node: nodeValue,
                message: `module is set to ${moduleValue} when it should be set to dist-esm/src/index.js`,
                fix: (fixer: Rule.RuleFixer): Rule.Fix =>
                  fixer.replaceText(nodeValue, `"dist-esm/src/index.js"`),
              });
            }
          },
        } as Rule.RuleListener)
      : {};
  },
};
