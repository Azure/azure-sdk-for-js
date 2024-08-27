// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to force the inclusion of type declarations in the package.
 *
 */

import { TSESTree } from "@typescript-eslint/utils";
import { createRule, getVerifiers, stripPath, isEsmPackage } from "../utils";
import { VerifierMessages, stripFileName } from "../utils/verifiers";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-types",
  meta: {
    type: "suggestion",
    docs: {
      description: "force package.json to specify types according to package directory",
    },
    messages: {
      ...VerifierMessages,
      TypesNotString: "types is not set to a string",
      TypesNotDTs: "provided types path is not a TypeScript declaration file",
      TypesNotValid:
        "provided types file should be named '{{packageDirectory}}.d.ts' after the package directory",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const verifiers = getVerifiers(context, {
      outer: "types",
      expected: false,
    });
    const fileName = context.filename;
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    if (isEsmPackage(context.filename)) {
      return {};
    }
    return {
      // check to see if types exists at the outermost level
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

      // check the node corresponding to types to see if its value is a TypeScript declaration file
      "ExpressionStatement > ObjectExpression > Property[key.value='types']": (
        node: TSESTree.Property,
      ): void => {
        const value = node.value;
        if (value.type !== "Literal" || typeof value.value !== "string") {
          return context.report({
            node: node.value,
            messageId: "TypesNotString",
          });
        }

        const baseName = stripPath(value.value);
        // Get the name of the package directory
        const packageDirectory = stripPath(stripFileName(fileName));
        const typesOutputName = baseName.replace(/\..*$/, "");
        // filename ending in '.d.ts' and matches package name
        if (!/\.d\.ts$/.test(baseName as string)) {
          context.report({
            node: value,
            messageId: "TypesNotDTs",
          });
        } else if (typesOutputName !== packageDirectory) {
          context.report({
            node: value,
            messageId: "TypesNotValid",
            data: {
              packageDirectory,
            },
          });
        }
      },
    };
  },
});
