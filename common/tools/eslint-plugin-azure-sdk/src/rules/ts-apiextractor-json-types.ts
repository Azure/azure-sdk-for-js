// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force the inclusion of type declarations in the package.
 */

import { TSESTree } from "@typescript-eslint/utils";

import { createRule, getVerifiers, stripPath } from "../utils/index.js";
import { VerifierMessages, stripFileName } from "../utils/verifiers.js";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-apiextractor-json-types",
  meta: {
    type: "suggestion",
    docs: {
      description: "force api-extractor.json to configure types in a consistent way",
      recommended: "recommended",
    },
    messages: {
      ...VerifierMessages,
      rollupPathNotString: ".d.ts rollup path is not set to a string",
      rollupPathNotDTs: "provided .d.ts rollup path is not a TypeScript declaration file",
      rollupPathNotNamedWell:
        "provided .d.ts rollup path should be named '{{packageDirectory}}.d.ts' after the package directory",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const verifiers = getVerifiers(context, {
      outer: "dtsRollup",
      inner: "publicTrimmedFilePath",
      expected: false,
    });
    const fileName = context.filename;
    if (stripPath(fileName) !== "api-extractor.json") {
      return {};
    }
    return {
      // callback functions
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,
      // check to see if dtsRollup.publicTrimmedFilePath is defined
      "ExpressionStatement > ObjectExpression > Property[key.value='dtsRollup']":
        verifiers.isMemberOf,

      // check the node corresponding to types to see if its value is a TypeScript declaration file
      "ExpressionStatement > ObjectExpression > Property[key.value='dtsRollup'] > ObjectExpression > Property[key.value='publicTrimmedFilePath']":
        (node: TSESTree.Property): void => {
          const value = node.value;
          if (value.type !== "Literal" || typeof value.value !== "string") {
            context.report({
              node: node.value,
              messageId: "rollupPathNotString",
            });
            return;
          }

          const baseName = stripPath(value.value);
          // Get the name of the package directory
          const packageDirectory = stripPath(stripFileName(fileName));
          const typesOutputName = baseName.replace(/\..*$/, "");
          // filename ending in '.d.ts' and matches package name
          if (!/\.d\.ts$/.test(baseName)) {
            context.report({
              node: value,
              messageId: "rollupPathNotDTs",
            });
          } else if (typesOutputName !== packageDirectory) {
            context.report({
              node: value,
              messageId: "rollupPathNotNamedWell",
              data: {
                packageDirectory,
              },
            });
          }
        },
    };
  },
});
