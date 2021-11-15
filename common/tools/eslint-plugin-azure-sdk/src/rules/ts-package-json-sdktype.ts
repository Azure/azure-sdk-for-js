// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's 'sdk-type' value to be valid (and exist)
 * @author Arpan Laha
 * @author Ben Zhang
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
    "force package.json's sdk-type to exist and for its value to be 'client' or 'mgmt'",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "sdk-type"
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
        // callback functions

        // check to see if package.json includes 'sdk-type'
        "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

        // check the node corresponding to sdk-type to see if its value contains "client" or "mgmt"
        "ExpressionStatement > ObjectExpression > Property[key.value='sdk-type']": (
          node: Property
        ): void => {
          const { value } = node;

          // check for valid type
          if (value.type !== "Literal" || typeof value.value !== "string") {
            context.report({
              node: node.value,
              message: "sdk-type is not set to a string"
            });
            return;
          }

          const strValue = stripPath(value.value);

          if (!["client", "mgmt", "utility"].includes(strValue)) {
            context.report({
              node: node.value,
              message: `unrecognized sdk-type value: ${strValue}. Expected either "client", "mgmt", or "utility."`
            });
            return;
          }
        }
      } as Rule.RuleListener)
      : {};
  }
};
