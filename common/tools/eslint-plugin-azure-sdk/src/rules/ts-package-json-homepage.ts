// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's homepage value to be a URL pointing to your library's readme inside the git repo.
 * @author Arpan Laha
 */

import { Literal, Property } from "estree";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-homepage",
    "force package.json's homepage value to be a URL pointing to your library's readme inside the git repo"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "homepage",
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if homepage exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to homepage to see if its value is a URL pointing to your library's readme inside the git repo
          "ExpressionStatement > ObjectExpression > Property[key.value='homepage']": (
            node: Property
          ): void => {
            const nodeValue = node.value as Literal;

            if (
              !/^https:\/\/github.com\/Azure\/azure-sdk-for-js\/(blob|tree)\/main\/sdk\/(([a-z]+-)*[a-z]+\/)+(README\.md)?$/.test(
                nodeValue.value as string
              )
            ) {
              context.report({
                node: nodeValue,
                message:
                  "homepage is not a URL pointing to your library's readme inside the git repo",
              });
            }
          },
        } as Rule.RuleListener)
      : {};
  },
};
