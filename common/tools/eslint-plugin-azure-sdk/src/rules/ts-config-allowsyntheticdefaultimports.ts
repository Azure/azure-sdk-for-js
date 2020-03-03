// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force tsconfig.json's compilerOptions.allowSyntheticDefaultImports value to be true.
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-config-allowsyntheticdefaultimports",
    "force tsconfig.json's compilerOptions.allowSyntheticDefaultImports value to be true",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "compilerOptions",
      inner: "allowSyntheticDefaultImports",
      expected: true
    });
    return stripPath(context.getFilename()) === "tsconfig.json"
      ? ({
          // callback functions

          // check to see if compilerOptions exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check that allowSyntheticDefaultImports is a member of compilerOptions
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions']":
            verifiers.isMemberOf,

          // check the node corresponding to compilerOptions.allowSyntheticDefaultImports to see if it is set to true
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions'] > ObjectExpression > Property[key.value='allowSyntheticDefaultImports']":
            verifiers.innerMatchesExpected
        } as Rule.RuleListener)
      : {};
  }
};
