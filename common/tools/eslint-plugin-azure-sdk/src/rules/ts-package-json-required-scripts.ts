// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's scripts value to at least contain build and test.
 * @author Arpan Laha
 */

import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Property } from "estree";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-required-scripts",
    "force package.json's scripts value to at least contain build, test, and prepack"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const buildVerifiers = getVerifiers(context, {
      outer: "scripts",
      inner: "build",
    });
    const testVerifiers = getVerifiers(context, {
      outer: "scripts",
      inner: "test",
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if scripts exists at the outermost level
          "ExpressionStatement > ObjectExpression": buildVerifiers.existsInFile,

          // check to see if scripts contains both build and test
          "ExpressionStatement > ObjectExpression > Property[key.value='scripts']": (
            node: Property
          ): void => {
            buildVerifiers.isMemberOf(node);
            testVerifiers.isMemberOf(node);
          },
        } as Rule.RuleListener)
      : {};
  },
};
