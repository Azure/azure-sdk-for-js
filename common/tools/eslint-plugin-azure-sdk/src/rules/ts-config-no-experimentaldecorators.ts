// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force tsconfig.json's compilerOptions.experimentalDecorators value to be false.
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-config-no-experimentaldecorators",
    "force tsconfig.json's compilerOptions.experimentalDecorators value to be false",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "compilerOptions",
      inner: "experimentalDecorators",
      expected: false
    });
    return stripPath(context.getFilename()) === "tsconfig.json"
      ? ({
          // callback functions

          // check to see if compilerOptions exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to compilerOptions.experimentalDecorators to see if it is set to false
          "ExpressionStatement > ObjectExpression > Property[key.value='compilerOptions'] > ObjectExpression > Property[key.value='experimentalDecorators']":
            verifiers.innerMatchesExpected
        } as Rule.RuleListener)
      : {};
  }
};
