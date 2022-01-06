// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require TSDoc comments to include internal or hidden tags if the object is internal.
 * @author Arpan Laha
 */

import { ParserServices, TSESTree } from "@typescript-eslint/experimental-utils";
import { getLocalExports, getRuleMetaData } from "../utils";
import { Node } from "estree";
import { ParserWeakMapESTreeToTSNode } from "@typescript-eslint/typescript-estree/dist/parser-options";
import { Rule } from "eslint";
import { TypeChecker } from "typescript";
import { sync as globSync } from "glob";
import { readFileSync } from "fs";
import { relative } from "path";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * Helper method for reporting on a node
 * @param node the Node being operated on
 * @param context the ESLint runtime context
 * @param converter a converter from TSESTree Nodes to TSNodes
 * @param typeChecker the TypeScript TypeChecker
 * @throws if the Node passes throught the initial checks and does not have an internal or hidden tag
 */
const reportInternal = (
  node: Node,
  context: Rule.RuleContext,
  converter: ParserWeakMapESTreeToTSNode,
  typeChecker: TypeChecker
): void => {
  const tsNode = converter.get(node as TSESTree.Node) as any;
  const symbol = typeChecker.getTypeAtLocation(tsNode).getSymbol();

  // if type is internal and has a TSDoc
  if (!context.settings.exported.includes(symbol) && tsNode.jsDoc !== undefined) {
    // fetch all tags
    let TSDocTags: string[] = [];
    tsNode.jsDoc.forEach((TSDocComment: any): void => {
      TSDocTags = TSDocTags.concat(
        TSDocComment.tags !== undefined
          ? TSDocComment.tags.map((TSDocTag: any): string => TSDocTag.tagName.escapedText)
          : []
      );
    });

    // see if any match hidden or internal
    if (!TSDocTags.some((TSDocTag: string): boolean => /(internal)|(hidden)/.test(TSDocTag))) {
      context.report({
        node: node,
        message: "internal items with TSDoc comments should include an @internal or @hidden tag",
      });
    }
  }
};

/**
 * Determine whether this rule should examine a given file
 * @param fileName the filename of the file in question
 * @param exclude the list of files excluded by TypeDoc (other than those in node_modues)
 * @returns false if not in src or is excluded by TypeDoc
 */
const shouldExamineFile = (fileName: string, exclude: string[]): boolean => {
  if (!/src/.test(fileName)) {
    return false;
  }
  const relativePath = relative("", fileName).replace(/\\/g, "/");
  return !exclude.includes(relativePath);
};

let exclude: string[] = [];
try {
  const typeDocText = readFileSync("typedoc.json", "utf8");
  const typeDoc = JSON.parse(typeDocText);

  // if typeDoc.exclude exists, add all files matching the glob patterns to exclude
  if (typeDoc.exclude !== undefined) {
    typeDoc.exclude.forEach((excludedGlob: string): void => {
      exclude = exclude.concat(
        globSync(excludedGlob).filter(
          (excludeFile: string): boolean => !/node_modules/.test(excludeFile)
        )
      );
    });
  }
} catch (err) {
  exclude = [];
}

export = {
  meta: getRuleMetaData(
    "ts-doc-internal",
    "require TSDoc comments to include an '@internal' or '@hidden' tag if the object is not public-facing"
  ),
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    const fileName = context.getFilename();

    // on the first run, if on a .ts file (program.getSourceFile is file-type dependent)
    if (context.settings.exported === undefined && /\.ts$/.test(fileName)) {
      const packageExports = getLocalExports(context);
      if (packageExports !== undefined) {
        context.settings.exported = packageExports;
      } else {
        context.settings.exported = [];
        return {};
      }
    }

    const parserServices = context.parserServices as ParserServices;
    if (
      parserServices.program === undefined ||
      parserServices.esTreeNodeToTSNodeMap === undefined
    ) {
      return {};
    }

    const typeChecker = parserServices.program.getTypeChecker();
    const converter = parserServices.esTreeNodeToTSNodeMap;

    return shouldExamineFile(fileName, exclude)
      ? {
          // callback functions

          // container declarations
          ":matches(TSInterfaceDeclaration, ClassDeclaration, TSModuleDeclaration)": (
            node: Node
          ): void => reportInternal(node, context, converter, typeChecker),

          // standalone functions
          ":function": (node: Node): void => {
            if (
              context
                .getAncestors()
                .every(
                  (ancestor: Node): boolean =>
                    !["ClassBody", "TSInterfaceBody", "TSModuleBlock"].includes(ancestor.type)
                )
            ) {
              reportInternal(node, context, converter, typeChecker);
            }
          },
        }
      : {};
  },
};
