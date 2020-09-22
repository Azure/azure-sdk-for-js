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

/**
 * The rule is configurable by those two vars, where badPatterns is the list of
 * patterns that should not be in package.json's files list and goodPatterns is
 * the list of patterns that should be.
 */
const badPatterns: string[] = ["src"];
const goodPatterns = ["dist", "dist-esm/src"];

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
    // sorting the patterns descendingly so in cases of overlap between patterns
    // (e.g. dist and dist-esm), the regex tries to match the longer first.
    const regExprStr = `^(?:.\/)?(${badPatterns
      .concat(goodPatterns)
      .sort()
      .reverse()
      .join("|")})(?:\/)?(?:.+)?`;
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

            let currBadPatterns: string[] = [];
            let currGoodPatterns = [...goodPatterns];
            const fullMatchIndex = 0;
            const patternRootMatchIndex = 1;
            elements.forEach((element) => {
              const patternMatchResult = (element.value as string).match(regExprStr);
              if (patternMatchResult !== null) {
                const patternRoot = patternMatchResult[patternRootMatchIndex];
                if (badPatterns.indexOf(patternRoot) >= 0) {
                  currBadPatterns.push(patternMatchResult[fullMatchIndex]);
                } else if (goodPatterns.indexOf(patternRoot) >= 0) {
                  currGoodPatterns.splice(currGoodPatterns.indexOf(patternRoot));
                }
              }
            });
            let message = "";
            if (currBadPatterns.length > 0) {
              message = `${currBadPatterns.join()} ${
                currBadPatterns.length === 1 ? "is" : "are"
              } included in files`;
              elementValues = elementValues.filter(
                (element) => currBadPatterns.indexOf(element as string) < 0
              );
            }
            if (currGoodPatterns.length > 0) {
              if (message.length > 0) {
                message = message + " and ";
              }
              message =
                message +
                `${currGoodPatterns.join()} ${
                  currGoodPatterns.length === 1 ? "is" : "are"
                } not included in files`;
              elementValues = elementValues.concat(currGoodPatterns);
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
