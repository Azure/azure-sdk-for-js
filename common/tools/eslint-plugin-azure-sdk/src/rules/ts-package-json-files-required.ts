// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's files value to contain paths to the package contents.
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

          // check that files contains dist, dist-esm, and src
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
            const elementValues = elements.map((element: Literal): unknown => element.value);

            // looks for 'dist' with optional leading './' and optional trailing '/'
            if (
              elements.every(
                (element: Literal): boolean =>
                  !/^(.\/)?((dist\/)|(dist$))/.test(element.value as string)
              )
            ) {
              context.report({
                node: nodeValue,
                message: "dist is not included in files",
                fix: (fixer: Rule.RuleFixer): Rule.Fix => {
                  elementValues.push("dist");
                  return fixer.replaceText(nodeValue, arrayToString(elementValues));
                }
              });
            }

            // looks for 'dist-esm/src' with optional leading './' and optional trailing '/'
            if (
              elements.every(
                (element: Literal): boolean =>
                  !/^(.\/)?dist-esm\/((src\/)|(src$))/.test(element.value as string)
              )
            ) {
              context.report({
                node: nodeValue,
                message: "dist-esm/src is not included in files",
                fix: (fixer: Rule.RuleFixer): Rule.Fix => {
                  elementValues.push("dist-esm/src");
                  return fixer.replaceText(nodeValue, arrayToString(elementValues));
                }
              });
            }
          }
        } as Rule.RuleListener)
      : {};
  }
};
