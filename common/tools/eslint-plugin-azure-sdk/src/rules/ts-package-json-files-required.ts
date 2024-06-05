// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to force package.json's files value to contain paths to the package contents and excludes source code files.
 *
 */
import { TSESTree } from "@typescript-eslint/utils";
import { VerifierMessages, arrayToString, createRule, getVerifiers, stripPath, usesTshy } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const requiredPatternSuggestionMap: Map<string, string | undefined> = new Map();
function addRequiredPattern(pattern: string, suggestion?: string): void {
  requiredPatternSuggestionMap.set(pattern, suggestion);
}

/**
 * The rule is configurable by those two vars, where badPatterns is the list of
 * patterns that should not be in package.json's files list and requiredPatterns
 * is the list of patterns that should be.
 */
const badPatterns = ["src"];
addRequiredPattern("dist");
addRequiredPattern("dist-esm", "src");
const requiredPatterns = Array.from(requiredPatternSuggestionMap.keys());

/**
 * Creates the more specific and recommended pattern that will be added to the
 * files list by the fixer.
 * @param pat - A pattern that is missing from the files list
 */
function buildFixRequiredPattern(pat: string): string {
  return requiredPatternSuggestionMap.get(pat) !== undefined
    ? `${pat}/${requiredPatternSuggestionMap.get(pat)}`
    : pat;
}

/**
 * Updates the patterns in the input list to be the more specific and
 * recommended patterns.
 * @param currRequiredPatterns - A list of patterns that are required
 * but missing from the files list
 */
function updateFixRequiredPatterns(currRequiredPatterns: string[]): void {
  for (let i = 0; i < currRequiredPatterns.length; ++i) {
    const pat = currRequiredPatterns[i];
    currRequiredPatterns[i] = buildFixRequiredPattern(pat);
  }
}

export default createRule({
  name: "ts-package-json-files-required",
  meta: {
    type: "suggestion",
    docs: {
      description: "requires package.json's files value to contain paths to the package contents",
      recommended: "recommended",
    },
    messages: {
      ...VerifierMessages,
      FilesNotArray: "files is not set to an array",
      FilesIssue: "Issue with files: {{details}}",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const verifiers = getVerifiers(context, {
      outer: "files",
    });
    if (stripPath(context.filename) !== "package.json") {
      return {};
    }
    if (usesTshy(context.filename)) {
      return {};
    }
    return {
      // check to see if files exists at the outermost level
      "ExpressionStatement > ObjectExpression": verifiers.existsInFile,

      "ExpressionStatement > ObjectExpression > Property[key.value='files']": (
        node: TSESTree.Property,
      ): void => {
        // check that files is set to an array
        if (node.value.type !== "ArrayExpression") {
          context.report({
            node: node.value,
            messageId: "FilesNotArray",
          });
          return;
        }

        // sorting the patterns descendingly so in cases of overlap between
        // pattern (e.g. dist and dist-esm), the regex tries to match the
        // longer first.
        const regExprStr = `^(?:.\/)?(${badPatterns
          .concat(requiredPatterns)
          .sort()
          .reverse()
          .join("|")})(?:\/)?(?:.+)?`;

        const nodeValue = node.value;
        let filesList = (nodeValue.elements as TSESTree.Literal[]).map(
          (element): unknown => element.value,
        );

        const currBadPatterns: string[] = [];
        const currRequiredPatterns = [...requiredPatterns];
        const fullMatchIndex = 0;
        const patternRootMatchIndex = 1;
        // Looking for both required and bad patterns
        for (const filePattern of filesList) {
          const patternMatchResult = (filePattern as string).match(regExprStr);
          if (patternMatchResult !== null) {
            const patternRoot = patternMatchResult[patternRootMatchIndex];
            if (badPatterns.indexOf(patternRoot) >= 0) {
              currBadPatterns.push(patternMatchResult[fullMatchIndex]);
            } else if (requiredPatterns.indexOf(patternRoot) >= 0) {
              const deletedItemsCount = 1;
              currRequiredPatterns.splice(
                currRequiredPatterns.indexOf(patternRoot),
                deletedItemsCount,
              );
            }
          }
        }
        let errorMessage = "";
        // Make sure there are no bad patterns, but if there are, create
        // a meaningful error message for them and remove them from the
        // files list
        if (currBadPatterns.length > 0) {
          const unitLength = 1;
          errorMessage = `${currBadPatterns.join()} ${
            currBadPatterns.length === unitLength ? "is" : "are"
          } included in files`;
          filesList = filesList.filter(
            (filePattern) => currBadPatterns.indexOf(filePattern as string) < 0,
          );
        }
        // If there are required patterns missing from the files' list,
        // create a meaningful error message and add them to the list (with
        // the default suggestion)
        if (currRequiredPatterns.length > 0) {
          updateFixRequiredPatterns(currRequiredPatterns);
          filesList = filesList.concat(currRequiredPatterns);
          if (errorMessage.length > 0) {
            errorMessage = `${errorMessage} and `;
          }
          const unitLength = 1;
          errorMessage = `${errorMessage}${currRequiredPatterns.join()} ${
            currRequiredPatterns.length === unitLength ? "is" : "are"
          } not included in files`;
        }
        if (errorMessage.length > 0) {
          context.report({
            node: nodeValue,
            messageId: "FilesIssue",
            data: { details: errorMessage },
            fix: (fixer) => fixer.replaceText(nodeValue, arrayToString(filesList)),
          });
        }
      },
    };
  },
});
