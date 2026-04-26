// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { TEST_PACKAGES, type ImportCategory, type ClassifiedImport } from "./types.js";

/**
 * Callback to determine if a relative import specifier points to source code.
 * Source code imports are rewritten to use the package name.
 */
export type SourceImportPredicate = (specifier: string) => boolean;

/**
 * Default heuristic: treat imports containing "/src/" as source code.
 * This works for Azure SDK's standard layout where tests are in test/ and source in src/.
 */
function defaultIsSourceImport(specifier: string): boolean {
  return specifier.includes("/src/");
}

/**
 * Determine the category of a module specifier string.
 */
function categorize(
  specifier: string,
  isSourceImport: SourceImportPredicate = defaultIsSourceImport,
): ImportCategory {
  // Test packages: exact match or @azure-tools/test-* prefix
  if (TEST_PACKAGES.has(specifier) || specifier.startsWith("@azure-tools/test-")) {
    return "test";
  }

  // Relative paths
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    // Source code: caller-defined predicate (default: /src/ heuristic)
    if (isSourceImport(specifier)) {
      return "sourceCode";
    }
    // Data file: .json extension
    if (specifier.endsWith(".json")) {
      return "dataFile";
    }
    // Local helper: any other relative path
    return "localHelper";
  }

  return "external";
}

/** Classify a single import declaration. */
export function classifyImport(
  node: ts.ImportDeclaration,
  isSourceImport?: SourceImportPredicate,
): ClassifiedImport {
  const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;
  return {
    node,
    category: categorize(moduleSpecifier, isSourceImport),
    moduleSpecifier,
  };
}

/** Classify all imports in a source file. */
export function classifyImports(
  sourceFile: ts.SourceFile,
  isSourceImport?: SourceImportPredicate,
): ClassifiedImport[] {
  return sourceFile.statements
    .filter(ts.isImportDeclaration)
    .map((node) => classifyImport(node, isSourceImport));
}
