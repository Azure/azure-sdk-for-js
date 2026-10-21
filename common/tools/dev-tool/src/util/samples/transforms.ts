// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { builtinModules } from "node:module";
import nodeBuiltins from "builtin-modules";
import type {
  BindingName,
  ImportClause,
  ImportDeclaration,
  NamedImportBindings,
  NamedImports,
  Node,
  ObjectBindingPattern,
  Statement,
  StringLiteral,
} from "typescript/ast";
import { NodeFlags, SyntaxKind, TokenFlags } from "typescript/ast";
import {
  createBindingElement,
  createCallExpression,
  createEmptyStatement,
  createExpressionStatement,
  createIdentifier,
  createObjectBindingPattern,
  createPropertyAccessExpression,
  createStringLiteral,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVariableStatement,
} from "typescript/ast/factory";
import {
  isExportAssignment,
  isExportDeclaration,
  isIdentifier,
  isImportDeclaration,
  isNamedImports,
  isNamespaceImport,
} from "typescript/ast/is";
import type { SourceRewriter, TextEdit } from "../typescript/edits.ts";
import { replaceStatement } from "../typescript/edits.ts";

// Retain deprecated built-ins supported by the running Node.js version.
const supportedNodeBuiltins = new Set([...nodeBuiltins, ...builtinModules]);

/**
 * A source rewriter that replaces imports with CommonJS `require` calls.
 *
 * The CommonJS emitter that is built into TypeScript is designed for semantic accuracy and compliance with the ES
 * specification. This transform is a best-effort conversion that maintains readability.
 *
 * Syntactic forms that are not handled by this transform are rejected by the source processor (see processor.ts).
 *
 * @param getPackage - loads a module, to decide whether it has default exports
 * @returns a rewriter that performs the transform to CommonJS
 */
export const createToCommonJsTransform: (
  getPackage: (moduleSpecifier: string) => unknown,
) => SourceRewriter =
  (getPackage) =>
  ({ api, sourceFile }) => {
    const edits: TextEdit[] = [];

    const visit = (node: Node): void => {
      if (isImportDeclaration(node)) {
        edits.push(replaceStatement(api, node, importDeclarationToCommonJs(node, getPackage)));
      } else if (isExportDeclaration(node) || isExportAssignment(node)) {
        // TypeScript can choose to emit `export {}` in some cases, so we will remove any export declarations.
        edits.push(replaceStatement(api, node, createEmptyStatement()));
      } else {
        node.forEachChild(visit);
      }
    };

    visit(sourceFile);
    return edits;
  };

interface TranspiledModule {
  __esModule?: boolean;
}

/**
 * Convert an ImportDeclaration into a require call.
 *
 * Syntax Primer:
 *
 * An ImportDeclaration has a few parts:
 * - `import` the import keyword
 * - an optional import clause, which specifies the binding of imported names it is one of:
 *   - a namespace import (`* as name`) that will bind all exports
 *   - an identifier (`name`) that will bind to the default export
 *   - an object pattern (`{ name }`) that will destructure the exports
 * - a module specifier, which _must_ be a string literal (otherwise is a grammar error)
 *
 * We can transpile ES Modules by synthesizing a call `require(<module specifier>)` and then, if an import clause was
 * specified, binding the names using a variable declaration.
 *
 * Replacing the declaration through a text edit (see edits.ts) keeps its comments, because they are not part of the
 * replaced range.
 *
 * @param decl - an ImportDeclaration
 * @param requireInScope - loads a module, to decide whether it has default exports
 * @returns a new statement to replace the import declaration
 */
export function importDeclarationToCommonJs(
  decl: ImportDeclaration,
  requireInScope: (moduleSpecifier: string) => unknown,
): Statement {
  if (decl.moduleSpecifier.kind !== SyntaxKind.StringLiteral) {
    const file = decl.getSourceFile();
    const { line, character } = file.getLineAndCharacterOfPosition(decl.getFullStart());
    throw new Error(
      `[Internal Error] ${
        file.fileName + ":" + line + ":" + character
      } import module specifier is not a string literal`,
    );
  }

  const moduleSpecifierText = (decl.moduleSpecifier as StringLiteral).text;

  const requireCall = () =>
    createCallExpression(
      createIdentifier("require"),
      /* questionDotToken: */ undefined,
      /* typeArguments: */ undefined,
      [createStringLiteral(moduleSpecifierText, TokenFlags.None)],
      NodeFlags.None,
    );

  if (!decl.importClause) {
    // import "foo";
    return createExpressionStatement(requireCall());
  }

  // import <clause> from "foo";

  const primaryBinding = importClauseToBinding(decl.importClause);

  const namedBindings = decl.importClause.namedBindings;

  const isDefaultImport =
    isIdentifier(primaryBinding) &&
    // Node builtins are never treated as default imports.
    !isNodeBuiltin(moduleSpecifierText) &&
    // If this is a namespace import, then it's not a default import.
    !(namedBindings && isNamespaceImport(namedBindings)) &&
    // @azure imports are treated as defaults
    (/^@azure(-[a-z0-9]*)?\//.test(moduleSpecifierText) ||
      // Relative imports are treated as defaults
      isRelativePath(moduleSpecifierText) ||
      // Ultimately, if the module has an `__esModule` field, we treat it as a default import. This mimics the behavior
      // of runtime `esModuleInterop`
      (requireInScope(moduleSpecifierText) as TranspiledModule).__esModule);

  // The declaration will usually only contain one item, and it will be something like:
  //
  // const a = require("foo");
  //
  // however, if both a default or namespace import and a set of named bindings were given, then there will be _two_
  // items, and it will be something like:
  //
  // const a = require("foo").default, { b } = require("foo");
  const declarationList = [
    createVariableDeclaration(
      primaryBinding,
      /* exclamationToken: */ undefined,
      /* type: */ undefined,
      // If the binding was a name, and this isn't a namespace import, then we need to access .default on it.
      isDefaultImport
        ? createPropertyAccessExpression(
            requireCall(),
            /* questionDotToken: */ undefined,
            createIdentifier("default"),
            NodeFlags.None,
          )
        : requireCall(),
    ),
  ];

  // If the main binding is an identifier (simple symbol) and we had named imports, then we need to add the named
  // imports as well
  if (isIdentifier(primaryBinding) && namedBindings && isNamedImports(namedBindings)) {
    // import a, { b } from "foo";
    declarationList.push(
      createVariableDeclaration(
        namedImportsToObjectBindingPattern(namedBindings),
        /* exclamationToken: */ undefined,
        /* type: */ undefined,
        requireCall(),
      ),
    );
  }

  return createVariableStatement(
    /* modifiers: */ undefined,
    createVariableDeclarationList(declarationList, NodeFlags.Const),
  );
}

/**
 * Gets the primary binding for an import clause.
 *
 * @param clause - the import clause to convert into a binding
 * @returns an identifier or binding pattern for a variable declaration
 */
function importClauseToBinding(clause: ImportClause): BindingName {
  if (clause.name) {
    // import name from "foo";
    return clause.name;
  } else {
    const bindings = clause.namedBindings as NamedImportBindings;

    if (isNamespaceImport(bindings)) {
      return bindings.name;
    } else if (isNamedImports(bindings)) {
      return namedImportsToObjectBindingPattern(bindings);
    } else {
      throw new Error("[Internal Error] Unknown ImportClause.namedBindings form.");
    }
  }
}

/**
 * Convert named imports into an object binding pattern.
 *
 * @param imports - the named imports of an import clause
 * @returns an object binding (destructuring) pattern
 */
function namedImportsToObjectBindingPattern(imports: NamedImports): ObjectBindingPattern {
  return createObjectBindingPattern(
    imports.elements.map((element) =>
      createBindingElement(
        /* dotDotDotToken: */ undefined, // Not allowed in named imports
        element.propertyName,
        element.name,
      ),
    ),
  );
}

/**
 * Processes a segmented module path to return the first segment. This is useful for packages that have nested imports
 * such as "dayjs/plugin/duration".
 *
 * @param specifier - the module specifier to resolve to a package name
 * @returns a package name
 */
export function resolveModule(specifier: string): string {
  const parts = specifier.split("/", 2);

  // The first part could be a namespace, in which case we need to join them
  if (parts.length > 1 && parts[0].startsWith("@")) return parts[0] + "/" + parts[1];
  else return parts[0];
}

/**
 * Determines if a module specifier refers to a node builtin.
 *
 * @param specifier - the module specifier to test
 */
export function isNodeBuiltin(moduleSpecifier: string): boolean {
  return (
    moduleSpecifier.startsWith("node:") || supportedNodeBuiltins.has(resolveModule(moduleSpecifier))
  );
}

/**
 * Determines whether a string is a relative path.
 *
 * @param input - a string to test
 */
export const isRelativePath = (input: string): boolean => /^\.\.?[/\\]/.test(input);

/**
 * Determines whether a module specifier is a package dependency.
 *
 * A dependency is a module specifier that does not refer to a node builtin and
 * is not a relative path.
 *
 * Absolute path imports are not supported in samples (because the package base
 * is not fixed relative to the source file).
 *
 * @param moduleSpecifier - the string given to `import` or `require`
 * @returns - true if `moduleSpecifier` should be considered a reference to a
 * node module dependency
 */
export function isDependency(moduleSpecifier: string): boolean {
  if (isNodeBuiltin(moduleSpecifier)) return false;

  return !isRelativePath(moduleSpecifier);
}
