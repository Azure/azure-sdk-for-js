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

const badFiles: string[] = ["src", "dist-esm"];
const goodFiles = ["dist"];

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
    const regExprStr = `^(?:.\/)?(${badFiles
      .concat(goodFiles)
      .sort()
      .reverse()
      .join("|")})(?:\/)?(?:.+)?`;
    console.log("regex: ", regExprStr);
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

            let currBadFiles: string[] = [];
            let currGoodFiles = [...goodFiles];
            const fullMatchIndex = 0;
            const patternRootMatchIndex = 1;
            elements.forEach((element) => {
              const patternMatchResult = (element.value as string).match(regExprStr);
              if (patternMatchResult !== null) {
                const patternRoot = patternMatchResult[patternRootMatchIndex];
                if (badFiles.indexOf(patternRoot) >= 0) {
                  currBadFiles.push(patternMatchResult[fullMatchIndex]);
                } else if (goodFiles.indexOf(patternRoot) >= 0) {
                  currGoodFiles.splice(currGoodFiles.indexOf(patternRoot));
                }
              }
            });
            let message = "";
            if (currBadFiles.length > 0) {
              message = `${currBadFiles.join()} ${
                currBadFiles.length === 1 ? "is" : "are"
              } included in files`;
              elementValues = elementValues.filter(
                (element) => currBadFiles.indexOf(element as string) < 0
              );
            }
            if (currGoodFiles.length > 0) {
              if (message.length > 0) {
                message = message + " and ";
              }
              message =
                message +
                `${currGoodFiles.join()} ${
                  currGoodFiles.length === 1 ? "is" : "are"
                } not included in files`;
              elementValues = elementValues.concat(currGoodFiles);
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
