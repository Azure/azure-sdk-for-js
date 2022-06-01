// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force the inclusion of type declarations in the package.
 * @author Arpan Laha
 */

import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Property } from "estree";
import { Rule } from "eslint";
import { stripFileName } from "../utils/verifiers";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-types",
    "force package.json to specify types according to package directory"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "types",
      expected: false,
    });
    const fileName = context.getFilename();
    return stripPath(fileName) === "package.json"
      ? ({
          // callback functions
          // check to see if types exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to types to see if its value is a TypeScript declaration file
          "ExpressionStatement > ObjectExpression > Property[key.value='types']": (
            node: Property
          ): void => {
            const value = node.value;
            if (value.type !== "Literal" || typeof value.value !== "string") {
              context.report({
                node: node.value,
                message: "types is not set to a string",
              });
              return;
            }

            const baseName = stripPath(value.value);
            // Get the name of the package directory
            const packageDirectory = stripPath(stripFileName(fileName));
            const typesOutputName = baseName.replace(/\..*$/, "");
            // filename ending in '.d.ts' and matches package name
            if (!/\.d\.ts$/.test(baseName as string)) {
              context.report({
                node: value,
                message: "provided types path is not a TypeScript declaration file",
              });
            } else if (typesOutputName !== packageDirectory) {
              context.report({
                node: value,
                message: `provided types file should be named '${packageDirectory}.d.ts' after the package directory`,
              });
            }
          },
        } as Rule.RuleListener)
      : {};
  },
};
