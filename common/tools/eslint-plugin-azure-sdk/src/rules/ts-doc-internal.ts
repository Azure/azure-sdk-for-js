// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @file Rule to require TSDoc comments to include internal or hidden tags if the object is internal.
 *
 */

import { TSESTree, ESLintUtils } from "@typescript-eslint/utils";
import { getLocalExports, createRule } from "../utils";
import { globSync } from "glob";
import { readFileSync } from "fs";
import { relative } from "path";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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
          (excludeFile: string): boolean => !/node_modules/.test(excludeFile),
        ),
      );
    });
  }
} catch {
  exclude = [];
}

export default createRule({
  name: "ts-doc-internal",
  meta: {
    type: "suggestion",
    docs: {
      description:
        "require TSDoc comments to include an '@internal' or '@hidden' tag if the object is not public-facing",
    },
    messages: {
      InternalShouldBeMarked:
        "internal items with TSDoc comments should include an @internal or @hidden tag",
    },
    schema: [],
    fixable: "code",
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();
    const converter = parserServices.esTreeNodeToTSNodeMap;

    /**
     * Helper method for reporting on a node
     * @param node the Node being operated on
     * @param context the ESLint runtime context
     * @param converter a converter from TSESTree Nodes to TSNodes
     * @param typeChecker the TypeScript TypeChecker
     * @throws if the Node passes throught the initial checks and does not have an internal or hidden tag
     */
    const reportInternal = (node: TSESTree.Node): void => {
      const tsNode = converter.get(node as TSESTree.Node) as any;
      const symbol = typeChecker.getTypeAtLocation(tsNode).getSymbol();
      const exported = context.settings.exported as Array<unknown>;

      // if type is internal and has a TSDoc
      if (!exported.includes(symbol) && tsNode.jsDoc !== undefined) {
        // fetch all tags
        let TSDocTags: string[] = [];
        let hasDocComments = false;
        tsNode.jsDoc.forEach((TSDocComment: any): void => {
          hasDocComments = true;
          TSDocTags = TSDocTags.concat(
            TSDocComment.tags !== undefined
              ? TSDocComment.tags.map((TSDocTag: any): string => TSDocTag.tagName.escapedText)
              : [],
          );
        });

        // see if any match hidden or internal
        if (
          hasDocComments &&
          !TSDocTags.some((TSDocTag: string): boolean => /(internal)|(hidden)/.test(TSDocTag))
        ) {
          context.report({
            node: (node as any).id ?? node,
            messageId: "InternalShouldBeMarked",
          });
        }
      }
    };

    const fileName = context.filename;

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

    if (!shouldExamineFile(fileName, exclude)) {
      return {};
    }

    return {
      // callback functions

      // container declarations
      ":matches(TSInterfaceDeclaration, ClassDeclaration, TSModuleDeclaration)": (
        node: TSESTree.Node,
      ): void => reportInternal(node),

      // standalone functions
      ":function": (node: TSESTree.Node): void => {
        if (!context.sourceCode.getAncestors) {
          return;
        }
        if (
          context.sourceCode
            .getAncestors(node)
            .every(
              (ancestor: TSESTree.Node): boolean =>
                !["ClassBody", "TSInterfaceBody", "TSModuleBlock"].includes(ancestor.type),
            )
        ) {
          reportInternal(node);
        }
      },
    };
  },
});
