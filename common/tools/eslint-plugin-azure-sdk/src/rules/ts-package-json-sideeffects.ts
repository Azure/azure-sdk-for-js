// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to validate package.json's sideEffects value.
 *
 */

import { TSESTree } from "@typescript-eslint/utils";
import { VerifierMessages, createRule, getVerifiers, stripPath } from "../utils/index.js";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-sideeffects",
  meta: {
    type: "suggestion",
    docs: {
      description: "validate package.json's sideEffects value for its SDK type",
    },
    messages: {
      ...VerifierMessages,
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    return {
      "ExpressionStatement > ObjectExpression": (node: TSESTree.ObjectExpression): void => {
        const findProperty = (name: string): TSESTree.Property | undefined =>
          node.properties.find(
            (property): property is TSESTree.Property =>
              property.type === "Property" &&
              property.key.type === "Literal" &&
              property.key.value === name,
          );
        const sdkType = findProperty("sdk-type")?.value;
        const verifiers = getVerifiers(context, {
          outer: "sideEffects",
          expected: sdkType?.type === "Literal" && sdkType.value === "provisioning",
        });
        verifiers.existsInFile(node);
        const sideEffects = findProperty("sideEffects");
        if (sideEffects) {
          verifiers.outerMatchesExpected(sideEffects);
        }
      },
    };
  },
});
