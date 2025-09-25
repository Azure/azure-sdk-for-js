// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to check if a private class member is tagged with @internal
 *
 */

import { TSESTree, ESLintUtils } from "@typescript-eslint/utils";
import { SyntaxKind, canHaveModifiers } from "typescript";
import { createRule } from "../utils/index.js";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default createRule({
  name: "ts-doc-internal-private-member",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "requires TSDoc comments to not include an '@internal' tag if the object is private",
    },
    messages: {
      PrivateMembersNotInternal: "private class members should not include an @internal tag",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const converter = parserServices.esTreeNodeToTSNodeMap;

    /**
     * Helper method for reporting on a node
     * @param node the Node being operated on
     * @param context the ESLint runtime context
     * @param converter a converter from TSESTree Nodes to TSNodes
     * @param typeChecker the TypeScript TypeChecker
     * @throws if the Node passes throught the initial checks and has an internal tag
     */
    const reportInternal = (node: TSESTree.Node): void => {
      const tsNode = converter.get(node);
      if (!canHaveModifiers(tsNode)) {
        return;
      }
      const modifiers = tsNode.modifiers;

      // if type is internal and has a TSDoc and is a private member
      if (
        (tsNode as any).jsDoc !== undefined &&
        modifiers?.some((modifier) => modifier.kind === SyntaxKind.PrivateKeyword)
      ) {
        // fetch all tags
        for (const comment of (tsNode as any).jsDoc) {
          if (comment.tags !== undefined) {
            for (const tag of comment.tags) {
              if (tag.tagName.escapedText.match(/internal/)) {
                context.report({
                  node,
                  messageId: "PrivateMembersNotInternal",
                  fix(fixer) {
                    const sourceCode = context.sourceCode;
                    
                    // Find the specific comment token that corresponds to this JSDoc comment
                    const commentTokens = sourceCode.getAllComments();
                    
                    // Find the comment that starts closest to the node's position
                    let targetComment = null;
                    let minDistance = Infinity;
                    
                    for (const commentToken of commentTokens) {
                      if (commentToken.type === "Block" && commentToken.value.includes("@internal")) {
                        // Check if this comment is before the node and within a reasonable distance
                        const distance = node.range[0] - commentToken.range[1];
                        if (distance >= 0 && distance < minDistance) {
                          targetComment = commentToken;
                          minDistance = distance;
                        }
                      }
                    }
                    
                    if (targetComment) {
                      const commentText = targetComment.value;
                      const lines = commentText.split('\n');
                      const filteredLines = lines.filter(line => {
                        const trimmed = line.trim();
                        return !trimmed.endsWith('@internal') && trimmed !== '* @internal';
                      });
                      
                      // Only fix if we actually removed some lines
                      if (filteredLines.length < lines.length) {
                        const newCommentValue = filteredLines.join('\n');
                        const newComment = `/*${newCommentValue}*/`;
                        return fixer.replaceText(targetComment, newComment);
                      }
                    }
                    
                    return null;
                  },
                });
              }
            }
          }
        }
      }
    };

    return {
      ":matches(ClassProperty, PropertyDefinition, MethodDefinition, TSMethodSignature, TSPropertySignature, TSIndexSignature, TSParameterProperty)":
        (node: TSESTree.Node): void => reportInternal(node),
    };
  },
});
