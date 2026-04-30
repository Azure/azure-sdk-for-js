// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to force package.json's repository value to be set to type "git" and url "git+https://github.com/Azure/azure-sdk-for-js".
 *
 */

import { VerifierMessages, createRule, getVerifiers, stripPath } from "../utils/index.js";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-repo",
  meta: {
    type: "suggestion",
    docs: {
      description: "force package.json's repository value to be type 'git' and url 'git+https://github.com/Azure/azure-sdk-for-js'",
    },
    messages: {
      ...VerifierMessages,
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const typeVerifiers = getVerifiers(context, {
      outer: "repository",
      inner: "type",
      expected: "git",
    });
    const urlVerifiers = getVerifiers(context, {
      outer: "repository",
      inner: "url",
      expected: "git+https://github.com/Azure/azure-sdk-for-js",
    });

    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    return {
      // check to see if repository exists at the outermost level
      "ExpressionStatement > ObjectExpression": typeVerifiers.existsInFile,

      // check that type and url are members of repository
      "ExpressionStatement > ObjectExpression > Property[key.value='repository']": (node) => {
        typeVerifiers.isMemberOf(node);
        urlVerifiers.isMemberOf(node);
      },

      // check the node corresponding to repository.type to see if it is set to "git"
      "ExpressionStatement > ObjectExpression > Property[key.value='repository'] > ObjectExpression > Property[key.value='type']":
        typeVerifiers.innerMatchesExpected,

      // check the node corresponding to repository.url to see if it is set to "git+https://github.com/Azure/azure-sdk-for-js"
      "ExpressionStatement > ObjectExpression > Property[key.value='repository'] > ObjectExpression > Property[key.value='url']":
        urlVerifiers.innerMatchesExpected,
    };
  },
});
