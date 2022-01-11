// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require copyright headers in every source file.
 * @author Arpan Laha
 */

import { Comment, Node } from "estree";
import { Rule } from "eslint";
import { getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const expectedLines = ["Copyright (c) Microsoft Corporation.", "Licensed under the MIT license."];

const expectedComments = `// ${expectedLines.join("\n// ")}\n\n`;

function isValid(comments: Comment[]): boolean {
  return expectedLines
    .map((l, idx) => ({ expected: l, actual: comments[idx] }))
    .every((v) => v.actual.type === "Line" && v.expected === v.actual.value.trim());
}

export = {
  meta: getRuleMetaData(
    "github-source-headers",
    "require copyright headers in every source file",
    "code"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener =>
    /\.ts$/.test(context.getFilename())
      ? {
          // callback functions

          // check top-level node
          Program: (node: Node): void => {
            const sourceCode = context.getSourceCode();
            const headerComments = sourceCode.getCommentsBefore(node);

            if (headerComments.length < expectedLines.length || !isValid(headerComments)) {
              context.report({
                node: (headerComments[0] as any) || node,
                message: "the file does not have a correct copyright header",

                fix(fixer: Rule.RuleFixer): Rule.Fix {
                  return fixer.insertTextBefore(
                    (headerComments[0] as any) || node,
                    expectedComments
                  );
                },
              });
            }
          },
        }
      : {},
};
