// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to check if package.json includes 'sdk-type'
 * @author Ben Zhang
 */

import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-sdktype-exists",
    "check if package.json includes 'sdk-type'",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "sdk-type",
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if package.json includes 'sdk-type'
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,
        } as Rule.RuleListener)
      : {};
  }
};
