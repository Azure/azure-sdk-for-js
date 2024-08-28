// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to require copyright headers in every source file.
 */

import { createRule } from "../utils/ruleCreator";
import { TSESTree } from "@typescript-eslint/utils";

const expectedLines = ["Copyright (c) Microsoft Corporation.", "Licensed under the MIT License."];

const expectedComments = `// ${expectedLines.join("\n// ")}\n\n`;

function isValid(comments: TSESTree.Comment[]): boolean {
  return expectedLines
    .map((l, idx) => ({ expected: l, actual: comments[idx] }))
    .every((v) => v.actual.type === "Line" && v.expected === v.actual.value.trim());
}

export default createRule({
  name: "github-source-headers",
  meta: {
    type: "suggestion",
    docs: {
      description: "require copyright headers in every source file",
    },
    messages: {
      noCopyrightHeader: "the file does not have a correct copyright header",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    if (!/\.ts$/.test(context.filename)) {
      return {};
    }
    return {
      Program: (node): void => {
        const sourceCode = context.sourceCode;
        const headerComments = sourceCode.getCommentsBefore(node);

        if (headerComments.length < expectedLines.length || !isValid(headerComments)) {
          const targetNode = headerComments[0] || node;
          context.report({
            node: targetNode,
            messageId: "noCopyrightHeader",
            fix: (fixer) => fixer.insertTextBefore(targetNode, expectedComments),
          });
        }
      },
    };
  },
});
