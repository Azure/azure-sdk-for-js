// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's files value to contain paths to the package contents and excludes source code files.
 * @author Arpan Laha
 */

import { Rule } from "eslint";
import { Literal, Property } from "estree";
import { arrayToString, getRuleMetaData, getVerifiers, stripPath } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export = {
  meta: getRuleMetaData(
    "ts-package-json-files-required",
    "requires package.json's files value to contain paths to the package contents",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const verifiers = getVerifiers(context, {
      outer: "files"
    });
    return stripPath(context.getFilename()) === "package.json"
      ? ({
          // callback functions

          // check to see if files exists at the outermost level
          "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

          // check that files contains dist, and do not include dist-esm, and src
          "ExpressionStatement > ObjectExpression > Property[key.value='files']": (
            node: Property
          ): void => {
            // check that files is set to an array
            if (node.value.type !== "ArrayExpression") {
              context.report({
                node: node.value,
                message: "files is not set to an array"
              });
              return;
            }

            const nodeValue = node.value;
            const elements = nodeValue.elements as Literal[];
            let elementValues = elements.map((element: Literal): unknown => element.value);

            let badFiles: string[] = [];
            let goodFiles = ["dist"];
            const fullMatchIndex = 0;
            const patternRootMatchIndex = 1;
            elements.forEach((element) => {
              const patternMatchResult = (element.value as string).match(
                /^(?:.\/)?(dist-esm|dist|src)(?:\/)?(?:.+)?/
              );
              if (patternMatchResult !== null) {
                const patternRoot = patternMatchResult[patternRootMatchIndex];
                switch (patternRoot) {
                  case "dist-esm":
                  case "src":
                    badFiles.push(patternMatchResult[fullMatchIndex]);
                    break;
                  case "dist":
                    goodFiles.splice(goodFiles.indexOf(patternRoot));
                    break;
                  default:
                    context.report({
                      node: nodeValue,
                      message: "impossible"
                    });
                    return;
                }
              }
            });
            let message = "";
            if (badFiles.length > 0) {
              message = `${badFiles.join()} ${
                badFiles.length === 1 ? "is" : "are"
              } included in files`;
              elementValues = elementValues.filter(
                (element) => badFiles.indexOf(element as string) < 0
              );
            }
            if (goodFiles.length > 0) {
              if (message.length > 0) {
                message = message + " and ";
              }
              message =
                message +
                `${goodFiles.join()} ${
                  goodFiles.length === 1 ? "is" : "are"
                } not included in files`;
              elementValues = elementValues.concat(goodFiles);
            }
            if (message.length > 0) {
              context.report({
                node: nodeValue,
                message: message,
                fix: (fixer: Rule.RuleFixer): Rule.Fix => {
                  return fixer.replaceText(nodeValue, arrayToString(elementValues));
                }
              });
            }
          }
        } as Rule.RuleListener)
      : {};
  }
};
