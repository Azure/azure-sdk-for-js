// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import ts from "typescript";
import { TEST_PACKAGES, type ImportCategory, type ClassifiedImport } from "./types.js";

/**
 * Callback to determine if a resolved import path points to source code.
 * Receives the fully resolved absolute path of the import target.
 * Source code imports are rewritten to use the package name.
 */
export type SourceImportPredicate = (resolvedPath: string) => boolean;

/**
 * Resolve a relative import specifier to an absolute path.
 */
function resolveImportPath(specifier: string, importingFilePath: string): string {
  const importingDir = path.dirname(importingFilePath);
  return path.resolve(importingDir, specifier);
}

/**
 * Determine the category of a module specifier string.
 *
 * @param specifier - The import specifier (e.g., "../src/index.js")
 * @param importingFilePath - Absolute path of the file containing this import
 * @param isSourceImport - Predicate to classify resolved paths as source code
 */
function categorize(
  specifier: string,
  importingFilePath: string,
  isSourceImport: SourceImportPredicate,
): ImportCategory {
  // Test packages: exact match or @azure-tools/test-* prefix
  if (TEST_PACKAGES.has(specifier) || specifier.startsWith("@azure-tools/test-")) {
    return "test";
  }

  // Relative paths
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    // Resolve to absolute path and let the predicate decide
    const resolvedPath = resolveImportPath(specifier, importingFilePath);

    if (isSourceImport(resolvedPath)) {
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
  importingFilePath: string,
  isSourceImport: SourceImportPredicate,
): ClassifiedImport {
  const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;
  return {
    node,
    category: categorize(moduleSpecifier, importingFilePath, isSourceImport),
    moduleSpecifier,
  };
}

/** Classify all imports in a source file. */
export function classifyImports(
  sourceFile: ts.SourceFile,
  isSourceImport: SourceImportPredicate,
): ClassifiedImport[] {
  const filePath = sourceFile.fileName;
  return sourceFile.statements
    .filter(ts.isImportDeclaration)
    .map((node) => classifyImport(node, filePath, isSourceImport));
}
