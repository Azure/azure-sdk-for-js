// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's name value to be set to @azure/<service>.
 * @author Arpan Laha
 */

import { Literal, Property } from "estree";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";
import { Rule } from "eslint";
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
      outer: "name",
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
            const { nodeValue, packageName, subScope } = getPackageMetadata(node);
            // Check for a valid scope
            if (!/^@azure(-[a-z]+)?\//.test(packageName)) {
              context.report({
                node: nodeValue,
                message: "name is not set to @azure[-<subscope>]/<service>",
              });
              return;
            }
            const packageBaseName = stripPath(packageName);
            const packageDirectory = stripPath(stripFileName(fileName));

            if (!/^@azure(-[a-z]+)?\/([a-z]+-)*[a-z]+$/.test(packageName)) {
              context.report({
                node: nodeValue,
                message: "service name is not in kebab-case (lowercase and separated by hyphens)",
              });

              // Give a good error report if the non-kebab-case name does match the directory and suggest renaming it as well
              if (packageName === `@azure/${packageDirectory}`) {
                context.report({
                  node: nodeValue,
                  message:
                    "service name matches directory name, but the directory is not kebab case (lowercase and separated by hyphens)",
                });
              }
            } else if (!isValidFolder(packageName, packageDirectory, subScope)) {
              const subScopeSuffix = subScope ?? "";
              context.report({
                node: nodeValue,
                message: `service should be named '@azure${subScopeSuffix}/${packageDirectory}' or should be moved to a directory called '${packageBaseName}${subScopeSuffix}'`,
              });
            }
          },
        } as Rule.RuleListener)
      : {};
  },
};

function isValidFolder(packageName: string, folderName: string, subScope?: string): boolean {
  if (!subScope) {
    return RegExp(`^@azure(-[a-z]+)?\/${folderName}`).test(packageName);
  }

  // If there is a subScope, allow the  folder name to have it appended at the end i.e folder-name-subscope
  return RegExp(`^@azure(-[a-z]+)?\/${folderName}`).test(`${packageName}${subScope}`);
}

function getPackageMetadata(node: Property): {
  nodeValue: Literal;
  packageName: string;
  subScope: string | undefined;
} {
  const nodeValue = node.value as Literal;
  const packageName = nodeValue.value as string;
  // Check if there is a sub scope i.e @azure-rest
  const [_, subScope] = packageName.match(/^@azure(-[a-z]+)?\//) ?? [];

  return {
    nodeValue,
    packageName,
    subScope,
  };
}
