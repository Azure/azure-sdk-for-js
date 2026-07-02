// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @file Rule to require TSDoc comments to include internal or hidden tags if the object is internal.
 *
 */

import { TSESTree, ESLintUtils } from "@typescript-eslint/utils";
import { getLocalExports, createRule } from "../utils/index.js";
import { globSync } from "glob";
import { readFileSync } from "node:fs";
import { relative } from "node:path";

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

// A package's exported type Symbols, cached once per TypeScript Program (Programs are
// shared across a package's files, so this preserves the original compute-once-per-package
// memoization). This is deliberately kept OUT of `context.settings`: eslint-plugin-import's
// resolver hashes `context.settings` with no cycle detection (see eslint-module-utils
// resolve.js -> hash.js), and TS Symbol graphs are circular, so stashing them in settings
// overflows the stack when resolving imports (observed on @azure/cosmos).
const exportsByProgram = new WeakMap<object, Array<unknown>>();

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
    const program = parserServices.program;
    const typeChecker = program.getTypeChecker();
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
      // Prefer the per-Program cache; fall back to `settings.exported` so tests/config can
      // still inject a (non-circular) list. Never read circular Symbols back out of settings.
      const exported =
        exportsByProgram.get(program) ??
        (context.settings.exported as Array<unknown> | undefined) ??
        [];

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

    // On the first run for a package, compute its exported Symbols once and cache them by
    // Program. Guarded by `settings.exported === undefined` so an injected list (e.g. in
    // tests) short-circuits the computation, matching the original behavior.
    if (
      !exportsByProgram.has(program) &&
      context.settings.exported === undefined &&
      /\.ts|\.mts|\.cts$/.test(fileName)
    ) {
      const packageExports = getLocalExports(context);
      exportsByProgram.set(program, packageExports ?? []);
      if (packageExports === undefined) {
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
