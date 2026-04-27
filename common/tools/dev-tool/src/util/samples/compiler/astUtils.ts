// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shared AST utilities for the sample-tests compiler.
 */

import ts from "typescript";

/**
 * Get the module specifier string from an import/export declaration.
 */
export function getModuleSpecifier(
  node: ts.ImportDeclaration | ts.ExportDeclaration,
): string | undefined {
  if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
    return node.moduleSpecifier.text;
  }
  return undefined;
}

/**
 * Get the imported name from an import/export specifier.
 * For `import { foo as bar }`, returns "foo".
 * For `import { foo }`, returns "foo".
 */
export function getImportedName(spec: ts.ImportSpecifier | ts.ExportSpecifier): string {
  return (spec.propertyName ?? spec.name).text;
}

/**
 * Get the local name from an import/export specifier.
 * For `import { foo as bar }`, returns "bar".
 * For `import { foo }`, returns "foo".
 */
export function getLocalName(spec: ts.ImportSpecifier | ts.ExportSpecifier): string {
  return spec.name.text;
}
