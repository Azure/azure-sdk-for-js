// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's name value to be set to @azure/<service>.
 *
 */

import { TSESTree } from "@typescript-eslint/utils";
import { createRule, getVerifiers, stripPath } from "../utils";
import { VerifierMessages, stripFileName } from "../utils/verifiers";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-package-json-name",
  meta: {
    type: "suggestion",
    docs: {
      description: "force package.json's name value to be set to @azure/<service>",
      recommended: "recommended",
    },
    messages: {
      ...VerifierMessages,
      InvalidNameScope: "name is not set to @azure[-<subscope>]/<service>",
      InvalidServiceCase: "service name is not in kebab-case (lowercase and separated by hyphens)",
      InvalidDirectoryCase:
        "service name matches directory name, but the directory is not kebab case (lowercase and separated by hyphens)",
      InvalidDirectory:
        "service should be named '@azure{{subScopeSuffix}}/{{packageDirectory}}' or should be moved to a directory called '{{packageBaseName}}{{subScopeSuffix}}'",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const verifiers = getVerifiers(context, {
      outer: "name",
    });
    const fileName = context.filename;
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    return {
      // check to see if name exists at the outermost level
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

      // check the node corresponding to name to see if its value is @azure/<service>
      "ExpressionStatement > ObjectExpression > Property[key.value='name']": (
        node: TSESTree.Property,
      ): void => {
        const { nodeValue, packageName, subScope } = getPackageMetadata(node);
        // Check for a valid scope
        if (!/^@azure(-[a-z]+)?\//.test(packageName)) {
          context.report({
            node: nodeValue,
            messageId: "InvalidNameScope",
          });
          return;
        }
        const packageBaseName = stripPath(packageName);
        const packageDirectory = stripPath(stripFileName(fileName));

        if (!/^@azure(-[a-z]+)?\/([a-z]+-)*[a-z]+$/.test(packageName)) {
          context.report({
            node: nodeValue,
            messageId: "InvalidServiceCase",
          });

          // Give a good error report if the non-kebab-case name does match the directory and suggest renaming it as well
          if (packageName === `@azure/${packageDirectory}`) {
            context.report({
              node: nodeValue,
              messageId: "InvalidDirectoryCase",
            });
          }
        } else if (!isValidFolder(packageName, packageDirectory, subScope)) {
          const subScopeSuffix = subScope ?? "";
          context.report({
            node: nodeValue,
            messageId: "InvalidDirectory",
            data: {
              subScopeSuffix,
              packageDirectory,
              packageBaseName,
            },
          });
        }
      },
    };
  },
});

function isValidFolder(packageName: string, folderName: string, subScope?: string): boolean {
  if (!subScope) {
    return RegExp(`^@azure(-[a-z]+)?\/${folderName}`).test(packageName);
  }

  // If there is a subScope, allow the  folder name to have it appended at the end i.e folder-name-subscope
  return RegExp(`^@azure(-[a-z]+)?\/${folderName}`).test(`${packageName}${subScope}`);
}

function getPackageMetadata(node: TSESTree.Property): {
  nodeValue: TSESTree.Literal;
  packageName: string;
  subScope: string | undefined;
} {
  const nodeValue = node.value as TSESTree.Literal;
  const packageName = nodeValue.value as string;
  // Check if there is a sub scope i.e @azure-rest
  const [, subScope] = packageName.match(/^@azure(-[a-z]+)?\//) ?? [];

  return {
    nodeValue,
    packageName,
    subScope,
  };
}
