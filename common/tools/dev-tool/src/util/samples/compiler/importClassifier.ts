// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ts from "typescript";
import { TEST_PACKAGES, type ImportCategory, type ClassifiedImport } from "./types.js";

/**
 * Determine the category of a module specifier string.
 */
function categorize(specifier: string): ImportCategory {
  // Test packages: exact match or @azure-tools/test-* prefix
  if (TEST_PACKAGES.has(specifier) || specifier.startsWith("@azure-tools/test-")) {
    return "test";
  }

  // Relative paths
  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    // Source code: relative path containing /src/
    if (specifier.includes("/src/")) {
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
export function classifyImport(node: ts.ImportDeclaration): ClassifiedImport {
  const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;
  return {
    node,
    category: categorize(moduleSpecifier),
    moduleSpecifier,
  };
}

/** Classify all imports in a source file. */
export function classifyImports(sourceFile: ts.SourceFile): ClassifiedImport[] {
  return sourceFile.statements.filter(ts.isImportDeclaration).map(classifyImport);
}
