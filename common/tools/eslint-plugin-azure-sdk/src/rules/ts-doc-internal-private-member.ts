// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to check if a private class member is tagged with @internal
 * @author Hamsa Shankar
 */

import { ParserServices, TSESTree } from "@typescript-eslint/experimental-utils";
import { ParserWeakMapESTreeToTSNode } from "@typescript-eslint/typescript-estree/dist/parser-options";
import { Rule } from "eslint";
import { Node } from "estree";
import { Modifier, SyntaxKind } from "typescript";
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
  const tsNode = converter.get(node as TSESTree.Node) as any;

  const modifiers = converter.get(node as TSESTree.Node).modifiers;
  // if type is internal and has a TSDoc and is a private member
  if (tsNode.jsDoc !== undefined
    && modifiers !== undefined && modifiers.some(
      (modifier: Modifier): boolean => modifier.kind === SyntaxKind.PrivateKeyword)
  ) {
    // fetch all tags
    let TSDocTags: string[] = [];
    tsNode.jsDoc.forEach((TSDocComment: any): void => {
      TSDocTags = TSDocTags.concat(
        TSDocComment.tags !== undefined
          ? TSDocComment.tags.map((TSDocTag: any): string => TSDocTag.tagName.escapedText)
            .filter((TSDocTag: any) => TSDocTag.match(/internal/))
          : []
      );
    });

    // see if any tags match internal
    if (TSDocTags.length > 0) {
      context.report({
        node: node,
        message: "private class members should not include an @internal tag"
      });
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
      // callback functions

      // container declarations
      ":matches(TSInterfaceDeclaration, ClassDeclaration, TSModuleDeclaration)": (
        node: Node
      ): void => reportInternal(node, context, converter),

      // functions
      ":function": (node: Node): void => {
        reportInternal(node, context, converter);
      }
    };
  }
};
