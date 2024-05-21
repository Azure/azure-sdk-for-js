// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's scripts value to at least contain build and test.
 *
 */

import { TSESTree } from "@typescript-eslint/utils";
import { VerifierMessages, createRule, getVerifiers, stripPath } from "../utils/index.js";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-required-scripts",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "force package.json's scripts value to at least contain build, test, and prepack",
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
    const buildVerifiers = getVerifiers(context, {
      outer: "scripts",
      inner: "build",
    });
    const testVerifiers = getVerifiers(context, {
      outer: "scripts",
      inner: "test",
    });
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    return {
      // check to see if scripts exists at the outermost level
      "ExpressionStatement > ObjectExpression": buildVerifiers.existsInFile,

      // check to see if scripts contains both build and test
      "ExpressionStatement > ObjectExpression > Property[key.value='scripts']": (
        node: TSESTree.Property,
      ): void => {
        buildVerifiers.isMemberOf(node);
        testVerifiers.isMemberOf(node);
      },
    };
  },
});
