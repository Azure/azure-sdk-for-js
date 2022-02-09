// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to check if a private class member is tagged with @internal
 * @author Hamsa Shankar
 */

import { ParserServices, TSESTree } from "@typescript-eslint/experimental-utils";
import { Node } from "estree";
import { ParserWeakMapESTreeToTSNode } from "@typescript-eslint/typescript-estree/dist/parser-options";
import { Rule } from "eslint";
import { SyntaxKind } from "typescript";
import { getRuleMetaData } from "../utils";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * Helper method for reporting on a node
 * @param node the Node being operated on
 * @param context the ESLint runtime context
 * @param converter a converter from TSESTree Nodes to TSNodes
 * @param typeChecker the TypeScript TypeChecker
 * @throws if the Node passes throught the initial checks and has an internal tag
 */
const reportInternal = (
  node: Node,
  context: Rule.RuleContext,
  converter: ParserWeakMapESTreeToTSNode,
): void => {
  const tsNode = converter.get(node as TSESTree.Node);
  const modifiers = tsNode.modifiers;

  // if type is internal and has a TSDoc and is a private member
  if ((tsNode as any).jsDoc !== undefined
    && modifiers?.some((modifier) => modifier.kind === SyntaxKind.PrivateKeyword)) {
    // fetch all tags
    for (const comment of (tsNode as any).jsDoc) {
      if (comment.tags !== undefined) {
        for (const tag of comment.tags) {
          if (tag.tagName.escapedText.match(/internal/)) {
            context.report({
              node,
              message: "private class members should not include an @internal tag"
            });
          }
        }
      }
    }
  }
};

export = {
  meta: getRuleMetaData(
    "ts-doc-internal-private-member",
    "requires TSDoc comments to not include an '@internal' tag if the object is private"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {

    const parserServices = context.parserServices as ParserServices;
    if (
      parserServices.program === undefined ||
      parserServices.esTreeNodeToTSNodeMap === undefined
    ) {
      return {};
    }

    const converter = parserServices.esTreeNodeToTSNodeMap;

    return {
      ":matches(ClassProperty, MethodDefinition, TSMethodSignature, TSPropertySignature, TSIndexSignature, TSParameterProperty)": (
        node: Node
      ): void => reportInternal(node, context, converter)
    };
  }
};
