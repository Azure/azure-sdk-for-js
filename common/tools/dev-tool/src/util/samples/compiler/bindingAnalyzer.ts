// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Scope-aware binding analysis using TypeScript's binder/checker.
 *
 * Creates a lightweight single-file ts.Program (noLib, noResolve) to get
 * symbol-based reference resolution without needing dependency files.
 * This enables precise dead-code analysis that respects lexical scoping —
 * shadowed names, function parameters, and block-local declarations are
 * correctly distinguished from module-scope bindings.
 */

import ts from "typescript";

/**
 * A binding analyzer provides scope-aware symbol resolution for a single
 * TypeScript source file. Created via {@link createAnalyzer}.
 */
export interface BindingAnalyzer {
  /** The TypeScript type checker for symbol resolution */
  readonly checker: ts.TypeChecker;
  /** The analyzed source file */
  readonly sourceFile: ts.SourceFile;

  /**
   * Get the symbol for an identifier node.
   * Returns the local binding symbol (not the aliased export for imports).
   * Returns undefined for unresolved globals (e.g., `console`, `process`).
   */
  getSymbol(node: ts.Identifier): ts.Symbol | undefined;

  /**
   * Collect all symbols referenced (not declared) by a subtree.
   * Skips property names on the RHS of property access (a.b → only `a`).
   * Returns only symbols that have declarations in the source file.
   */
  getReferencedSymbols(node: ts.Node): Set<ts.Symbol>;

  /**
   * Get symbols declared by a top-level statement.
   * For variable statements: the variable symbols.
   * For function/class declarations: the name symbol.
   * For import declarations: the import binding symbols.
   */
  getDeclaredSymbols(stmt: ts.Statement): ts.Symbol[];

  /**
   * Resolve an import binding name to its symbol in the source file.
   * Looks up the import declaration's clause bindings.
   */
  getImportBindingSymbols(node: ts.ImportDeclaration): ts.Symbol[];

  /**
   * Check if an identifier is in a type-only position (type annotation,
   * type argument, implements clause, etc.) — not a runtime reference.
   */
  isTypePosition(node: ts.Identifier): boolean;
}

const analyzerCompilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.Latest,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  noLib: true,
  noResolve: true,
  strict: false,
  skipLibCheck: true,
  skipDefaultLibCheck: true,
};

/**
 * Create a binding analyzer for a source file.
 *
 * Uses a single-file ts.Program with noLib/noResolve to get the binder's
 * symbol tables without requiring any external files. The checker won't
 * resolve built-in types (string, Promise, etc.) but WILL correctly bind
 * local declarations, import bindings, and lexical scopes.
 */
export function createAnalyzer(sourceText: string, _fileName: string): BindingAnalyzer {
  // Use a safe internal filename for the ts.Program — angle brackets or other
  // special characters in the caller's fileName can break path resolution.
  const internalFileName = "__analyzer__.ts";
  const sourceFile = ts.createSourceFile(internalFileName, sourceText, ts.ScriptTarget.Latest, true);

  const host: ts.CompilerHost = {
    getSourceFile: (name, _target) => (name === internalFileName ? sourceFile : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => "/",
    getCanonicalFileName: (f) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (f) => f === internalFileName,
    readFile: (f) => (f === internalFileName ? sourceText : undefined),
  };

  const program = ts.createProgram([internalFileName], analyzerCompilerOptions, host);
  const checker = program.getTypeChecker();

  return {
    checker,
    sourceFile,
    getSymbol: (node) => getSymbolImpl(checker, sourceFile, node),
    getReferencedSymbols: (node) => getReferencedSymbolsImpl(checker, sourceFile, node),
    getDeclaredSymbols: (stmt) => getDeclaredSymbolsImpl(checker, sourceFile, stmt),
    getImportBindingSymbols: (node) => getImportBindingSymbolsImpl(checker, node),
    isTypePosition: (node) => isTypePositionImpl(node),
  };
}

/**
 * Get the symbol for an identifier, returning undefined for unresolved globals.
 * Uses the local alias symbol for imports (not the aliased export).
 */
function getSymbolImpl(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  node: ts.Identifier,
): ts.Symbol | undefined {
  const symbol = checker.getSymbolAtLocation(node);
  if (!symbol) return undefined;

  // Check if this symbol has any declarations in our source file
  if (!hasDeclarationInFile(symbol, sourceFile)) {
    return undefined; // Unresolved global — treat as external/live
  }

  return symbol;
}

/**
 * Check if a symbol has at least one declaration in the given source file.
 */
function hasDeclarationInFile(symbol: ts.Symbol, sourceFile: ts.SourceFile): boolean {
  const declarations = symbol.getDeclarations();
  if (!declarations || declarations.length === 0) return false;
  return declarations.some((d) => d.getSourceFile() === sourceFile);
}

/**
 * Collect all symbols referenced (not declared) by a subtree.
 *
 * For property access `a.b.c`, only `a` is collected (the root binding).
 * For declarations (`const x = ...`), `x` is NOT collected as a reference.
 * Parameters are not collected as references to module-scope bindings
 * because they resolve to their own parameter symbols.
 */
function getReferencedSymbolsImpl(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  root: ts.Node,
): Set<ts.Symbol> {
  const symbols = new Set<ts.Symbol>();
  const declaredInRoot = collectLocallyDeclaredSymbols(checker, sourceFile, root);

  function visit(node: ts.Node): void {
    // Skip property names on RHS of property access
    if (ts.isPropertyAccessExpression(node)) {
      visit(node.expression);
      return;
    }

    if (ts.isIdentifier(node) && !isDeclarationName(node)) {
      const sym = getSymbolImpl(checker, sourceFile, node);
      if (sym && !declaredInRoot.has(sym)) {
        symbols.add(sym);
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(root);
  return symbols;
}

/**
 * Collect symbols that are declared within a subtree (not module-scope references).
 * These are excluded from "referenced symbols" to avoid counting declarations as refs.
 */
function collectLocallyDeclaredSymbols(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  root: ts.Node,
): Set<ts.Symbol> {
  const declared = new Set<ts.Symbol>();

  function visit(node: ts.Node): void {
    // Variable declarations
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
      const sym = getSymbolImpl(checker, sourceFile, node.name);
      if (sym) declared.add(sym);
    }

    // Function declarations
    if (ts.isFunctionDeclaration(node) && node.name) {
      const sym = getSymbolImpl(checker, sourceFile, node.name);
      if (sym) declared.add(sym);
    }

    // Class declarations
    if (ts.isClassDeclaration(node) && node.name) {
      const sym = getSymbolImpl(checker, sourceFile, node.name);
      if (sym) declared.add(sym);
    }

    // Function parameters
    if (ts.isParameter(node) && ts.isIdentifier(node.name)) {
      const sym = getSymbolImpl(checker, sourceFile, node.name);
      if (sym) declared.add(sym);
    }

    // Binding patterns (destructuring)
    if (ts.isBindingElement(node) && ts.isIdentifier(node.name)) {
      const sym = getSymbolImpl(checker, sourceFile, node.name);
      if (sym) declared.add(sym);
    }

    ts.forEachChild(node, visit);
  }

  visit(root);
  return declared;
}

/**
 * Check if an identifier node is a declaration name (not a reference).
 * Declaration names include: variable names, function names, parameter names,
 * import specifier names, property declarations, etc.
 */
export function isDeclarationName(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (!parent) return false;

  // Variable declaration name
  if (ts.isVariableDeclaration(parent) && parent.name === node) return true;

  // Function/class declaration name
  if (ts.isFunctionDeclaration(parent) && parent.name === node) return true;
  if (ts.isClassDeclaration(parent) && parent.name === node) return true;

  // Parameter name
  if (ts.isParameter(parent) && parent.name === node) return true;

  // Import specifier: `import { Foo }` — `Foo` is a declaration
  if (ts.isImportSpecifier(parent) && parent.name === node) return true;

  // Import clause default: `import Foo from ...`
  if (ts.isImportClause(parent) && parent.name === node) return true;

  // Namespace import: `import * as Foo from ...`
  if (ts.isNamespaceImport(parent) && parent.name === node) return true;

  // Property name in object literal or interface
  if (ts.isPropertyAssignment(parent) && parent.name === node) return true;
  if (ts.isPropertyDeclaration(parent) && parent.name === node) return true;
  if (ts.isMethodDeclaration(parent) && parent.name === node) return true;

  // Binding element name (destructuring)
  if (ts.isBindingElement(parent) && parent.name === node) return true;

  // Type alias / interface name
  if (ts.isTypeAliasDeclaration(parent) && parent.name === node) return true;
  if (ts.isInterfaceDeclaration(parent) && parent.name === node) return true;

  // Enum name / member name
  if (ts.isEnumDeclaration(parent) && parent.name === node) return true;
  if (ts.isEnumMember(parent) && parent.name === node) return true;

  // Export specifier names
  if (ts.isExportSpecifier(parent) && parent.name === node) return true;

  // Shorthand property assignment: `{ foo }` — foo is both a name and a value ref.
  // This is a special case — we treat it as a reference, not a declaration.

  return false;
}

/**
 * Recursively collect all binding identifiers from a binding name.
 * Handles simple identifiers, object binding patterns, and array binding patterns.
 */
function collectBindingIdentifiers(name: ts.BindingName): ts.Identifier[] {
  if (ts.isIdentifier(name)) {
    return [name];
  }
  if (ts.isObjectBindingPattern(name)) {
    return name.elements.flatMap((e) => collectBindingIdentifiers(e.name));
  }
  if (ts.isArrayBindingPattern(name)) {
    return name.elements.filter(ts.isBindingElement).flatMap((e) => collectBindingIdentifiers(e.name));
  }
  return [];
}

/**
 * Get symbols declared by a statement.
 */
function getDeclaredSymbolsImpl(
  checker: ts.TypeChecker,
  sourceFile: ts.SourceFile,
  stmt: ts.Statement,
): ts.Symbol[] {
  const symbols: ts.Symbol[] = [];

  if (ts.isImportDeclaration(stmt)) {
    return getImportBindingSymbolsImpl(checker, stmt);
  }

  if (ts.isVariableStatement(stmt)) {
    for (const decl of stmt.declarationList.declarations) {
      for (const ident of collectBindingIdentifiers(decl.name)) {
        const sym = checker.getSymbolAtLocation(ident);
        if (sym && hasDeclarationInFile(sym, sourceFile)) {
          symbols.push(sym);
        }
      }
    }
    return symbols;
  }

  if (ts.isFunctionDeclaration(stmt) && stmt.name) {
    const sym = checker.getSymbolAtLocation(stmt.name);
    if (sym && hasDeclarationInFile(sym, sourceFile)) {
      symbols.push(sym);
    }
    return symbols;
  }

  if (ts.isClassDeclaration(stmt) && stmt.name) {
    const sym = checker.getSymbolAtLocation(stmt.name);
    if (sym && hasDeclarationInFile(sym, sourceFile)) {
      symbols.push(sym);
    }
    return symbols;
  }

  if (ts.isTypeAliasDeclaration(stmt)) {
    const sym = checker.getSymbolAtLocation(stmt.name);
    if (sym && hasDeclarationInFile(sym, sourceFile)) {
      symbols.push(sym);
    }
    return symbols;
  }

  if (ts.isInterfaceDeclaration(stmt)) {
    const sym = checker.getSymbolAtLocation(stmt.name);
    if (sym && hasDeclarationInFile(sym, sourceFile)) {
      symbols.push(sym);
    }
    return symbols;
  }

  if (ts.isEnumDeclaration(stmt)) {
    const sym = checker.getSymbolAtLocation(stmt.name);
    if (sym && hasDeclarationInFile(sym, sourceFile)) {
      symbols.push(sym);
    }
    return symbols;
  }

  return symbols;
}

/**
 * Get symbols for all bindings introduced by an import declaration.
 */
function getImportBindingSymbolsImpl(
  checker: ts.TypeChecker,
  node: ts.ImportDeclaration,
): ts.Symbol[] {
  const symbols: ts.Symbol[] = [];
  const clause = node.importClause;
  if (!clause) return symbols;

  // Default import: `import Foo from ...`
  if (clause.name) {
    const sym = checker.getSymbolAtLocation(clause.name);
    if (sym) symbols.push(sym);
  }

  // Named or namespace bindings
  if (clause.namedBindings) {
    if (ts.isNamedImports(clause.namedBindings)) {
      for (const spec of clause.namedBindings.elements) {
        const sym = checker.getSymbolAtLocation(spec.name);
        if (sym) symbols.push(sym);
      }
    } else if (ts.isNamespaceImport(clause.namedBindings)) {
      const sym = checker.getSymbolAtLocation(clause.namedBindings.name);
      if (sym) symbols.push(sym);
    }
  }

  return symbols;
}

/**
 * Check if an identifier is in a type-only position.
 * Type positions include: type annotations, type arguments, implements/extends
 * clauses, type assertions, and `import type` declarations.
 */
function isTypePositionImpl(node: ts.Identifier): boolean {
  let current: ts.Node = node;
  while (current.parent) {
    const parent = current.parent;

    // Type annotation, type reference, type query
    if (ts.isTypeNode(parent)) return true;

    // Heritage clause (extends/implements)
    if (ts.isHeritageClause(parent)) return true;

    // Type assertion / as expression
    if (ts.isTypeAssertionExpression(parent) && parent.type === current) return true;
    if (ts.isAsExpression(parent) && parent.type === current) return true;

    // import type { ... }
    if (ts.isImportClause(parent) && parent.isTypeOnly) return true;
    if (ts.isImportSpecifier(parent) && parent.isTypeOnly) return true;

    // Stop at statements — we've gone up far enough
    if (ts.isStatement(parent)) break;

    // Stop at function-like boundaries
    if (ts.isFunctionLike(parent)) break;

    current = parent;
  }
  return false;
}

/**
 * Get the symbol for an import binding name (convenience for string-based lookup).
 * Searches all import declarations for a binding with the given name.
 */
export function findImportSymbolByName(
  analyzer: BindingAnalyzer,
  name: string,
): ts.Symbol | undefined {
  for (const stmt of analyzer.sourceFile.statements) {
    if (!ts.isImportDeclaration(stmt)) continue;
    const symbols = analyzer.getImportBindingSymbols(stmt);
    for (const sym of symbols) {
      if (sym.name === name) return sym;
    }
  }
  return undefined;
}

/**
 * Resolve a set of binding names to their symbols in the analyzer's source file.
 * Searches top-level declarations (imports, variables, functions, classes, etc.).
 * Names that don't resolve to any symbol are silently ignored.
 */
export function resolveNamesToSymbols(
  analyzer: BindingAnalyzer,
  names: Iterable<string>,
): Set<ts.Symbol> {
  const nameSet = new Set(names);
  const result = new Set<ts.Symbol>();

  for (const stmt of analyzer.sourceFile.statements) {
    for (const sym of analyzer.getDeclaredSymbols(stmt)) {
      if (nameSet.has(sym.name)) {
        result.add(sym);
      }
    }
  }

  return result;
}
