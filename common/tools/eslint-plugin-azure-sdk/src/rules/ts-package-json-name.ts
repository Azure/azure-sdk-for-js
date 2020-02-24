// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's name value to be set to @azure/<service>.
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { Literal, Property } from "estree";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { stripFileName } from "../utils/verifiers";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-name",
    "force package.json's name value to be set to @azure/<service>"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "name"
    });
    const fileName = context.getFilename();
    return stripPath(fileName) === "package.json"
      ? ({
          // callback functions

          // check to see if name exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to name to see if its value is @azure/<service>
          "ExpressionStatement > ObjectExpression > Property[key.value='name']": (
            node: Property
          ): void => {
            const nodeValue = node.value as Literal;
            const name = nodeValue.value as string;

            if (!name.startsWith("@azure/")) {
              context.report({
                node: nodeValue,
                message: "name is not set to @azure/<service>"
              });
              return;
            }

            const packageDirectory = stripPath(stripFileName(fileName));
            const packageBaseName = stripPath(name);
            if (!/^@azure\/([a-z]+-)*[a-z]+$/.test(name)) {
              context.report({
                node: nodeValue,
                message: "service name is not in kebab-case (lowercase and separated by hyphens)"
              });

              // Give a good error report if the non-kebab-case name does match the directory and suggest renaming it as well
              if (name === `@azure/${packageDirectory}`) {
                context.report({
                  node: nodeValue,
                  message:
                    "service name matches directory name, but the directory is not kebab case (lowercase and separated by hyphens)"
                });
              }
            } else if (name !== `@azure/${packageDirectory}`) {
              context.report({
                node: nodeValue,
                message: `service should be named '@azure/${packageDirectory}' or should be moved to a directory called '${packageBaseName}'`
              });
            }
          }
        } as Rule.RuleListener)
      : {};
  }
};
