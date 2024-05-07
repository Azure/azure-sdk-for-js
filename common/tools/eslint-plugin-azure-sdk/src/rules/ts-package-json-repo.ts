// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's repository value to be set to github:Azure/azure-sdk-for-js.
 *
 */

import { VerifierMessages, createRule, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-repo",
  meta: {
    type: "suggestion",
    docs: {
      description: "force package.json's repository value to be 'github:Azure/azure-sdk-for-js'",
      recommended: "recommended",
    },
    messages: {
      ...VerifierMessages,
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const verifiers = getVerifiers(context, {
      outer: "repository",
      expected: "github:Azure/azure-sdk-for-js",
    });

    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    return {
      // check to see if repository exists at the outermost level
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

      // check the node corresponding to repository to see if its value is github:Azure/azure-sdk-for-js
      "ExpressionStatement > ObjectExpression > Property[key.value='repository']":
        verifiers.outerMatchesExpected,
    };
  },
});
