// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's keywords value to contain at least "Azure" and "cloud".
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-keywords",
    "force package.json's keywords value to contain at least 'Azure' and 'cloud'",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "keywords",
      expected: ["azure", "cloud"]
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if keywords exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to keywords to see if its value contains "Azure" and "cloud"
          "ExpressionStatement > ObjectExpression > Property[key.value='keywords']":
            verifiers.outerContainsExpected
        } as Rule.RuleListener)
      : {};
  }
};
