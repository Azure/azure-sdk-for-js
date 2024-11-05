// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to check if a private class member is tagged with @internal
 *
 */

import { TSESTree, ESLintUtils } from "@typescript-eslint/utils";
import { SyntaxKind, canHaveModifiers } from "typescript";
import { createRule } from "../utils";

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
