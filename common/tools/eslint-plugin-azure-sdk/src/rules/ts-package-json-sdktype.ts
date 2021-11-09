// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's 'sdk-type' value to be valid
 * @author Arpan Laha
 */

import { getRuleMetaData, stripPath } from "../utils";
import { Property } from "estree";
import { Rule } from "eslint";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-sdktype",
    "force package.json's sdk-type value to contain be 'client' or 'mgmt'"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check the node corresponding to sdk-type to see if its value contains "client" or "mgmt"
          "ExpressionStatement > ObjectExpression > Property[key.value='sdk-type']": (
            node: Property
          ) => {
            if (!node) {
              // Track1 packages don't have this property. Stop checking
              return;
            }

            const { value } = node;
            if (value.type !== "Literal" || typeof value.value !== "string") {
              context.report({
                node: node.value,
                message: "sdk-type is not set to a string"
              });
              return;
            }

            const strValue = stripPath(value.value);

            if (!["client", "mgmt"].includes(strValue)) {
              context.report({
                node: node.value,
                message: "sdk-type is not set to `client` or `mgmt`"
              });
              return;
            }
          }
        } as Rule.RuleListener)
      : {}
};
