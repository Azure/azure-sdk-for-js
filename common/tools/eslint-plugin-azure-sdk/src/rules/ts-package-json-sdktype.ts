// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to force package.json's 'sdk-type' value to be valid (and exist)
 *
 *
 */

import { TSESTree } from "@typescript-eslint/utils";
import { VerifierMessages, createRule, getVerifiers, stripPath } from "../utils/index.js";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-sdktype",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "force package.json's sdk-type to exist and have a recognized SDK package category",
    },
    messages: {
      ...VerifierMessages,
      SdkTypeNotString: "sdk-type is not set to a string",
      SdkTypeNotValid:
        "unrecognized sdk-type value: {{actual}}. Expected one of 'client', 'mgmt', 'provisioning', 'perf-test', or 'utility'.",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const verifiers = getVerifiers(context, {
      outer: "sdk-type",
    });
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    return {
      // check to see if package.json includes 'sdk-type'
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

      // Check the node corresponding to sdk-type for a recognized category.
      "ExpressionStatement > ObjectExpression > Property[key.value='sdk-type']": (
        node: TSESTree.Property,
      ): void => {
        const { value } = node;

        // check for valid type
        if (value.type !== "Literal" || typeof value.value !== "string") {
          return context.report({
            node: node.value,
            messageId: "SdkTypeNotString",
          });
        }

        const strValue = stripPath(value.value);

        if (!["client", "mgmt", "provisioning", "perf-test", "utility"].includes(strValue)) {
          return context.report({
            node: node.value,
            messageId: "SdkTypeNotValid",
            data: {
              actual: strValue,
            },
          });
        }
      },
    };
  },
});
