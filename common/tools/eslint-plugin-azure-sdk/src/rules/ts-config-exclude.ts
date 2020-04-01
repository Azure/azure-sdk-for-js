// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force tsconfig.json's "exclude" value to at least contain "node_modules"
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-config-exclude",
    "force tsconfig.json's compilerOptions.exclude value to at least contain 'node_modules'",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "exclude",
      expected: "node_modules"
    });
    return stripPath(context.getFilename()) === "tsconfig.json"
      ? ({
          // callback functions

          // check to see if exclude exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to exclude to see if its value contains "node_modules"
          "ExpressionStatement > ObjectExpression > Property[key.value='exclude']":
            verifiers.outerContainsExpected
        } as Rule.RuleListener)
      : {};
  }
};
