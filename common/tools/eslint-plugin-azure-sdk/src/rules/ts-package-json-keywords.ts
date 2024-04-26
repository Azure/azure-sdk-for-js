// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's keywords value to contain at least "Azure" and "cloud".
 *
 */

import { VerifierMessages, createRule, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-keywords",
  meta: {
    type: "suggestion",
    docs: {
      description: "force package.json's keywords value to contain at least 'Azure' and 'cloud'",
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
      outer: "keywords",
      expected: ["azure", "cloud"],
    });
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    return {
      // check to see if keywords exists at the outermost level
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

      // check the node corresponding to keywords to see if its value contains "Azure" and "cloud"
      "ExpressionStatement > ObjectExpression > Property[key.value='keywords']":
        verifiers.outerContainsExpected,
    };
  },
});
