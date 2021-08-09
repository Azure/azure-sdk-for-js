// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's 'sdk-type' value to be valid
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { Property } from "estree";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-sdktype",
    "force package.json's sdk-type value to contain be 'client' or 'management'"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "sdk-type"
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if sdk-type exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to sdk-type to see if its value contains "client" or "management"
          "ExpressionStatement > ObjectExpression > Property[key.value='sdk-type']": (
            node: Property
          ) => {
            const { value } = node;
            if (value.type !== "Literal" || typeof value.value !== "string") {
              context.report({
                node: node.value,
                message: "sdk-type is not set to a string"
              });
              return;
            }

            const strValue = stripPath(value.value);

            if (!["client", "management"].includes(strValue)) {
              context.report({
                node: node.value,
                message: "sdk-type is not set to `client` or `management`"
              });
              return;
            }
          }
        } as Rule.RuleListener)
      : {};
  }
};
