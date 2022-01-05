// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's bugs.url value to be "https://github.com/Azure/azure-sdk-for-js/issues".
 * @author Arpan Laha
 */

import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-bugs",
    "force package.json's bugs.url value to be 'https://github.com/Azure/azure-sdk-for-js/issues'",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "bugs",
      inner: "url",
      expected: "https://github.com/Azure/azure-sdk-for-js/issues",
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if bugs exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check that url is a member of bugs
          "ExpressionStatement > ObjectExpression > Property[key.value='bugs']":
            verifiers.isMemberOf,

          // check the node corresponding to bugs.url to see if it is set to 'https://github.com/Azure/azure-sdk-for-js/issues'
          "ExpressionStatement > ObjectExpression > Property[key.value='bugs'] > ObjectExpression > Property[key.value='url']":
            verifiers.innerMatchesExpected,
        } as Rule.RuleListener)
      : {};
  },
};
