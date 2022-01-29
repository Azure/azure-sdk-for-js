// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's author value to be set to "Microsoft Corporation".
 * @author Arpan Laha
 */

import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-author",
    "force package.json's author value to be 'Microsoft Corporation'",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "author",
      expected: "Microsoft Corporation",
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if author exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to author to see if its value is "Microsoft Corporation"
          "ExpressionStatement > ObjectExpression > Property[key.value='author']":
            verifiers.outerMatchesExpected,
        } as Rule.RuleListener)
      : {};
  },
};
