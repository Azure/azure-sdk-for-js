// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force adherence to SemVer guidelines.
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { Property } from "estree";
import { getRuleMetaData, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData("ts-versioning-semver", "force adherence to SemVer guidelines"),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "version"
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if version exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check the node corresponding to types to see if its value is a TypeScript declaration file
          "ExpressionStatement > ObjectExpression > Property[key.value='version']": (
            node: Property
          ): void => {
            if (node.value.type !== "Literal") {
              context.report({
                node: node.value,
                message: "version is not set to a string"
              });
              return;
            }
            const nodeValue = node.value;
            const version = nodeValue.value as string;

            // check for violations specific to semver
            const versionMatch = version.match(/^(0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(.+)|$)/);
            if (versionMatch === null) {
              context.report({
                node: nodeValue,
                message: "version is not in semver"
              });
              return;
            }

            const majorVersionNumber = versionMatch[1];
            if (majorVersionNumber === "0") {
              context.report({
                node: nodeValue,
                message: "major version should not be set to 0"
              });
            }
            
            // check that if preview or dev is in proper syntax if provided
            const secondPart = versionMatch[2];
            if (secondPart === undefined) {
              return;
            }
            const devOrPreviewVer = secondPart.match(/^(dev|preview)(.*)/);
            if (devOrPreviewVer === null) {
              context.report({
                node: nodeValue,
                message: `unrecognized version syntax: ${secondPart}`
              });
              return;
            }

            const devOrPreviewVerKeyword = devOrPreviewVer[1];
            const devOrPreviewVerNumber = devOrPreviewVer[2];
            switch(devOrPreviewVerKeyword) {
              case 'preview':
                if (!/^\.(:?0|(?:[1-9]\d*))$/.test(devOrPreviewVerNumber)) {
                  context.report({
                    node: nodeValue,
                    message: "preview format is not x.y.z-preview.i"
                  });
                  return;
                }
                break;
              case 'dev':
                if (!/^\.[2-9]\d\d\d[0-1]\d[0-3]\d\.(:?0|(?:[1-9]\d*))$/.test(devOrPreviewVerNumber)) {
                  context.report({
                    node: nodeValue,
                    message: "dev format is not x.y.z-dev.<date>.i"
                  });
                  return;
                }
                break;
                default:
                  context.report({
                    node: nodeValue,
                    message: "impossible"
                  });
                  return;
            }
          }
        } as Rule.RuleListener)
      : {};
  }
};
