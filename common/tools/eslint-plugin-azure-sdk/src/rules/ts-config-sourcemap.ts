// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force tsconfig.json's compilerOptions.sourceMap and compilerOptions.declarationMap values to both be true.
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
    "ts-config-sourcemap",
    "force tsconfig.json's compilerOptions.sourceMap and compilerOptions.declarationMap values to both be true",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const sourceMapVerifiers = getVerifiers(context, {
      outer: "compilerOptions",
      inner: "sourceMap",
      expected: true
    });
    const declarationMapVerifiers = getVerifiers(context, {
      outer: "compilerOptions",
      inner: "declarationMap",
      expected: true
    });

    return stripPath(context.getFilename()) === "tsconfig.json"
      ? ({
          // callback functions

          // check to see if compilerOptions exists at the outermost level
          "ExpressionStatement > ObjectExpression": sourceMapVerifiers.existsInFile,

          // check that sourceMap and declarationMap are both members of compilerOptions
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions']": (
            node: Property
          ): void => {
            sourceMapVerifiers.isMemberOf(node);
            declarationMapVerifiers.isMemberOf(node);
          },

          // check the node corresponding to compilerOptions.sourceMap to see if it is set to true
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions'] > ObjectExpression > Property[key.value='sourceMap']":
            sourceMapVerifiers.innerMatchesExpected,

          // check the node corresponding to compilerOptions.declarationMap to see if it is set to true
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions'] > ObjectExpression > Property[key.value='declarationMap']":
            declarationMapVerifiers.innerMatchesExpected
        } as Rule.RuleListener)
      : {};
  }
};
