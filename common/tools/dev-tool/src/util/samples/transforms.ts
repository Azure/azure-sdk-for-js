// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import ts from "typescript";

import nodeBuiltins from "builtin-modules";

/**
 * A TypeScript API transformer that replaces imports with CommonJS `require` calls.
 *
 * The CommonJS emitter that is built into TypeScript is designed for semantic accuracy and compliance with the ES
 * specification. This transform is a best-effort conversion that maintains readability.
 *
 * Syntactic forms that are not handled by this transform are rejected by the source processor (see processor.ts).
 *
 * @param context - the compiler API context
 * @returns a visitor that performs the transform to CommonJS
 */
export const createToCommonJsTransform: (
  getPackage: (moduleSpecifier: string) => unknown
) => ts.TransformerFactory<ts.SourceFile> = (getPackage) => (context) => (sourceFile) => {
  const visitor: ts.Visitor = (node) => {
    if (ts.isImportDeclaration(node)) {
      return ts.visitNode(
        importDeclarationToCommonJs(node, getPackage, context.factory, sourceFile),
        visitor
      );
    } else if (ts.isExportDeclaration(node) || ts.isExportAssignment(node)) {
      // TypeScript can choose to emit `export {}` in some cases, so we will remove any export declarations.
      return context.factory.createEmptyStatement();
    }

    return ts.visitEachChild(node, visitor, context);
  };

  return ts.visitNode(sourceFile, visitor);
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
 * @param decl - an ImportDeclaration
 * @param nodeFactory - a context-bound factory instance
 * @param sourceFile - the source file
 * @returns a new statement to replace the import declaration
 */
export function importDeclarationToCommonJs(
  decl: ts.ImportDeclaration,
  requireInScope: (moduleSpecifier: string) => unknown,
  nodeFactory?: ts.NodeFactory,
  sourceFile?: ts.SourceFile
): ts.Statement {
  if (decl.moduleSpecifier.kind !== ts.SyntaxKind.StringLiteral) {
    const file = sourceFile ?? decl.getSourceFile();
    const { line, character } = file.getLineAndCharacterOfPosition(decl.pos);
    throw new Error(
      `[Internal Error] ${
        file.fileName + ":" + line + ":" + character
      } import module specifier is not a string literal`
    );
  }

  const factory = nodeFactory ?? ts.factory;

  // We are creating new nodes, so comments must be manually preserved whenever we replace nodes.
  const outerComments = ts.getCommentRange(decl);

  const requireCall = () =>
    factory.createCallExpression(
      factory.createIdentifier("require"),
      /* typeArguments: */ undefined,
      [factory.createStringLiteral((decl.moduleSpecifier as ts.StringLiteral).text)]
    );

  if (!decl.importClause) {
    // import "foo";
    return ts.setCommentRange(factory.createExpressionStatement(requireCall()), outerComments);
  }

  // import <clause> from "foo";

  const primaryBinding = importClauseToBinding(decl.importClause, factory);

  const namedBindings = decl.importClause.namedBindings;
  const moduleSpecifierText = (decl.moduleSpecifier as ts.StringLiteral).text;

  const isDefaultImport =
    ts.isIdentifier(primaryBinding) &&
    // Node builtins are never treated as default imports.
    !isNodeBuiltin(moduleSpecifierText) &&
    // If this is a namespace import, then it's not a default import.
    !(namedBindings && ts.isNamespaceImport(namedBindings)) &&
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
    factory.createVariableDeclaration(
      primaryBinding,
      /* exclamationToken: */ undefined,
      /* type: */ undefined,
      // If the binding was a name, and this isn't a namespace import, then we need to access .default on it.
      isDefaultImport
        ? factory.createPropertyAccessExpression(requireCall(), "default")
        : requireCall()
    ),
  ];

  // If the main binding is an identifier (simple symbol) and we had named imports, then we need to add the named
  // imports as well
  if (ts.isIdentifier(primaryBinding) && namedBindings && ts.isNamedImports(namedBindings)) {
    // import a, { b } from "foo";
    declarationList.push(
      factory.createVariableDeclaration(
        namedImportsToObjectBindingPattern(namedBindings, factory),
        /* exclamationToken: */ undefined,
        /* type: */ undefined,
        requireCall()
      )
    );
  }

  return ts.setCommentRange(
    factory.createVariableStatement(
      /* modifiers: */ undefined,
      factory.createVariableDeclarationList(declarationList, ts.NodeFlags.Const)
    ),
    outerComments
  );
}

/**
 * Gets the primary binding for an import clause.
 *
 * @param clause - the import clause to convert into a binding
 * @param factory - a context-bound node factory
 * @returns an identifier or binding pattern for a variable declaration
 */
function importClauseToBinding(clause: ts.ImportClause, factory: ts.NodeFactory): ts.BindingName {
  if (clause.name) {
    // import name from "foo";
    return clause.name;
  } else {
    const bindings = clause.namedBindings as ts.NamedImportBindings;

    if (ts.isNamespaceImport(bindings)) {
      return bindings.name;
    } else if (ts.isNamedImports(bindings)) {
      return namedImportsToObjectBindingPattern(bindings, factory);
    } else {
      throw new Error("[Internal Error] Unknown ImportClause.namedBindings form.");
    }
  }
}

/**
 * Convert named imports into an object binding pattern.
 *
 * @param imports - the named imports of an import clause
 * @param factory - a context-bound node factory
 * @returns an object binding (destructuring) pattern
 */
function namedImportsToObjectBindingPattern(
  imports: ts.NamedImports,
  factory: ts.NodeFactory
): ts.ObjectBindingPattern {
  return factory.createObjectBindingPattern(
    imports.elements.map((element) =>
      factory.createBindingElement(
        /* dotDotDotToken: */ undefined, // Not allowed in named imports
        element.propertyName,
        element.name
      )
    )
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
    moduleSpecifier.startsWith("node:") || nodeBuiltins.includes(resolveModule(moduleSpecifier))
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
