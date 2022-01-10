// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's repository value to be set to github:Azure/azure-sdk-for-js.
 * @author Arpan Laha
 */

import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-repo",
    "force package.json's repository value to be 'github:Azure/azure-sdk-for-js'",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "repository",
      expected: "github:Azure/azure-sdk-for-js",
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if repository exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to repository to see if its value is github:Azure/azure-sdk-for-js
          "ExpressionStatement > ObjectExpression > Property[key.value='repository']":
            verifiers.outerMatchesExpected,
        } as Rule.RuleListener)
      : {};
  },
};
