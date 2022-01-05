// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's license value to be set to "MIT".
 * @license Arpan Laha
 */

import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-packge-json-license",
    "force package.json's license value to be 'MIT'",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "license",
      expected: "MIT",
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if license exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to license to see if its value is "MIT"
          "ExpressionStatement > ObjectExpression > Property[key.value='license']":
            verifiers.outerMatchesExpected,
        } as Rule.RuleListener)
      : {};
  },
};
