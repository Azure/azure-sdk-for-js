// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's sideEffects value to be set to false.
 *
 */

import { VerifierMessages, createRule, getVerifiers, stripPath } from "../utils/index.js";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-sideeffects",
  meta: {
    type: "suggestion",
    docs: {
      description: "force package.json's sideEffects value to be false",
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
      outer: "sideEffects",
      expected: false,
    });
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    return {
      // check to see if sideEffects exists at the outermost level
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

      // check the node corresponding to sideEffects to see if its value is false
      "ExpressionStatement > ObjectExpression > Property[key.value='sideEffects']":
        verifiers.outerMatchesExpected,
    };
  },
});
