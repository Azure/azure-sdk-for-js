// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Compiles local helper files imported by sample-test spec files.
 *
 * Unlike spec files, helpers have no describe/it/forPublishing structure.
 * The pipeline is: classify imports → resolve nested helpers → dead-binding
 * elimination → export detection → import rewriting → assemble output.
 *
 * Empty helpers (pure test infrastructure) are detected so the parent
 * compiler can mark their import bindings as dead.
 */

import ts from "typescript";
import { classifyImports } from "./importClassifier.js";
import { eliminateDeadStatements } from "./deadBindingEliminator.js";
import { createAnalyzer } from "./bindingAnalyzer.js";
import { rewriteImports } from "./importRewriter.js";
import { extractEnvVarNames } from "./envVarExtractor.js";

/** Resolved helper file returned by the resolver callback. */
export interface ResolvedHelper {
  /** Canonical path used for dedup and cycle detection */
  canonicalPath: string;
  /** The file's source text */
  sourceText: string;
}

/** Result of compiling a helper file. */
export interface CompiledHelper {
  /** Compiled output text */
  outputText: string;
  /** Export names that survived dead-binding elimination */
  survivingExports: Set<string>;
  /** Environment variables referenced */
  envVars: string[];
  /** True if no exported statements survived (pure test helper) */
  isEmpty: boolean;
  /** Nested helpers compiled during this helper's compilation */
  nestedHelpers: Map<string, CompiledHelper>;
  /** Warnings produced during compilation (e.g., unresolved nested helpers) */
  warnings: string[];
}

/** Callback to resolve a helper import specifier to source text. */
export type HelperResolver = (
  fromFile: string,
  specifier: string,
) => ResolvedHelper | undefined;

/**
 * Recursively collect all identifier names from a binding name (including destructuring).
 */
function collectAllBindingNames(name: ts.BindingName, out: Set<string>): void {
  if (ts.isIdentifier(name)) {
    out.add(name.text);
  } else if (ts.isObjectBindingPattern(name)) {
    for (const el of name.elements) collectAllBindingNames(el.name, out);
  } else if (ts.isArrayBindingPattern(name)) {
    for (const el of name.elements) {
      if (ts.isBindingElement(el)) collectAllBindingNames(el.name, out);
    }
  }
}

/**
 * Collect export names from surviving statements.
 */
function collectSurvivingExportsFromStatements(
  statements: readonly ts.Statement[],
): Set<string> {
  const exports = new Set<string>();

  for (const stmt of statements) {
    // Handle export declarations: export { x, y } or export { x } from "..."
    if (ts.isExportDeclaration(stmt)) {
      // Skip type-only exports (e.g., export type { Foo } from "...")
      if (stmt.isTypeOnly) continue;
      
      if (stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
        for (const spec of stmt.exportClause.elements) {
          exports.add(spec.name.text);
        }
      } else if (stmt.exportClause && ts.isNamespaceExport(stmt.exportClause)) {
        // export * as ns from "..." — the alias is the exported name
        exports.add(stmt.exportClause.name.text);
      } else if (!stmt.exportClause && stmt.moduleSpecifier) {
        // export * from "..." — re-exports all names from the module
        exports.add("*");
      }
      continue;
    }

    // Handle export default (export default function/class/expression)
    if (ts.isExportAssignment(stmt) && !stmt.isExportEquals) {
      exports.add("default");
      continue;
    }

    const modifiers = ts.canHaveModifiers(stmt) ? ts.getModifiers(stmt) : undefined;
    const hasExport = modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!hasExport) continue;

    // export default function/class (has both export and default modifiers)
    const hasDefault = modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword);
    if (hasDefault) {
      exports.add("default");
      continue;
    }

    if (ts.isFunctionDeclaration(stmt) && stmt.name) {
      exports.add(stmt.name.text);
    } else if (ts.isClassDeclaration(stmt) && stmt.name) {
      exports.add(stmt.name.text);
    } else if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        collectAllBindingNames(decl.name, exports);
      }
    } else if (ts.isEnumDeclaration(stmt)) {
      exports.add(stmt.name.text);
    }
  }

  return exports;
}


/**
 * Compile a local helper file.
 *
 * @param sourceText - The helper file's source text
 * @param packageName - Package name for source-code import rewriting
 * @param fileName - File name for error messages and cycle detection
 * @param resolveHelper - Optional callback to resolve nested helper imports
 * @param recursionStack - Set of canonical paths in the current call chain (cycle detection)
 * @param helperCache - Cache of previously compiled helper results
 */
export function compileHelper(
  sourceText: string,
  packageName: string,
  fileName: string,
  resolveHelper?: HelperResolver,
  recursionStack?: Set<string>,
  helperCache?: Map<string, CompiledHelper>,
): CompiledHelper {
  const currentStack = recursionStack ?? new Set<string>();
  const currentCache = helperCache ?? new Map<string, CompiledHelper>();
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // Create ONE analyzer for the full helper file (scope-aware symbol resolution)
  const analyzer = createAnalyzer(sourceText, fileName);

  // Classify imports
  const classified = classifyImports(analyzer.sourceFile);

  // Collect dead symbols from test imports
  const deadSymbols = new Set<ts.Symbol>();
  for (const ci of classified) {
    if (ci.category !== "test") continue;
    for (const sym of analyzer.getImportBindingSymbols(ci.node)) {
      deadSymbols.add(sym);
    }
  }

  // Resolve nested localHelper imports
  const nestedHelpers = new Map<string, CompiledHelper>();
  const emptyHelperSpecifiers = new Set<string>();
  // Maps re-export module specifier → child's surviving export names
  const childSurvivingExports = new Map<string, Set<string>>();
  const warnings: string[] = [];

  if (resolveHelper) {
    for (const ci of classified) {
      if (ci.category !== "localHelper") continue;

      const resolved = resolveHelper(fileName, ci.moduleSpecifier);
      if (!resolved) {
        warnings.push(
          `Could not resolve nested helper "${ci.moduleSpecifier}" from "${fileName}"`,
        );
        continue;
      }

      // Cycle detection — skip if currently being compiled in this call chain
      if (currentStack.has(resolved.canonicalPath)) continue;

      // Cache hit — reuse previously compiled result
      let nested: CompiledHelper;
      if (currentCache.has(resolved.canonicalPath)) {
        nested = currentCache.get(resolved.canonicalPath)!;
      } else {
        currentStack.add(resolved.canonicalPath);
        try {
          nested = compileHelper(
            resolved.sourceText,
            packageName,
            resolved.canonicalPath,
            resolveHelper,
            currentStack,
            currentCache,
          );
          currentCache.set(resolved.canonicalPath, nested);
        } finally {
          currentStack.delete(resolved.canonicalPath);
        }
      }

      if (nested.isEmpty) {
        // Pure test helper: mark all its import bindings as dead (by symbol)
        for (const sym of analyzer.getImportBindingSymbols(ci.node)) {
          deadSymbols.add(sym);
        }
        emptyHelperSpecifiers.add(ci.moduleSpecifier);
      } else {
        nestedHelpers.set(resolved.canonicalPath, nested);
        // Flatten transitive nested helpers into our map
        for (const [transitiveSpec, transitiveHelper] of nested.nestedHelpers) {
          if (!nestedHelpers.has(transitiveSpec)) {
            nestedHelpers.set(transitiveSpec, transitiveHelper);
          }
        }
      }
      // Collect warnings from nested helper compilations
      warnings.push(...nested.warnings);
    }

    // Also resolve re-export declarations that reference local helper files:
    //   export { foo } from "./helper.js"
    //   export * from "./helper.js"
    //   export * as ns from "./helper.js"
    for (const stmt of analyzer.sourceFile.statements) {
      if (
        !ts.isExportDeclaration(stmt) ||
        !stmt.moduleSpecifier ||
        !ts.isStringLiteral(stmt.moduleSpecifier)
      ) {
        continue;
      }

      const specifier = stmt.moduleSpecifier.text;

      // Apply same local-helper heuristic as importClassifier's categorize()
      if (!specifier.startsWith("./") && !specifier.startsWith("../")) continue;
      if (specifier.includes("/src/") || specifier.endsWith(".json")) continue;

      const resolved = resolveHelper(fileName, specifier);
      if (!resolved) {
        warnings.push(
          `Could not resolve nested helper re-export "${specifier}" from "${fileName}"`,
        );
        continue;
      }

      // Cycle detection — skip if currently being compiled in this call chain
      if (currentStack.has(resolved.canonicalPath)) continue;

      // Cache hit — reuse previously compiled result
      let nested: CompiledHelper;
      if (currentCache.has(resolved.canonicalPath)) {
        nested = currentCache.get(resolved.canonicalPath)!;
      } else {
        currentStack.add(resolved.canonicalPath);
        try {
          nested = compileHelper(
            resolved.sourceText,
            packageName,
            resolved.canonicalPath,
            resolveHelper,
            currentStack,
            currentCache,
          );
          currentCache.set(resolved.canonicalPath, nested);
        } finally {
          currentStack.delete(resolved.canonicalPath);
        }
      }

      if (nested.isEmpty) {
        emptyHelperSpecifiers.add(specifier);
      } else {
        nestedHelpers.set(resolved.canonicalPath, nested);
        childSurvivingExports.set(specifier, nested.survivingExports);
        for (const [transitiveSpec, transitiveHelper] of nested.nestedHelpers) {
          if (!nestedHelpers.has(transitiveSpec)) {
            nestedHelpers.set(transitiveSpec, transitiveHelper);
          }
        }
      }
      warnings.push(...nested.warnings);
    }
  }

  // Get non-import statements directly from the analyzer's sourceFile,
  // filtering out export declarations that reference empty helpers and
  // rewriting partial re-exports to only include surviving specifiers.
  const nonImportStatements: ts.Statement[] = [];
  for (const s of analyzer.sourceFile.statements) {
    if (ts.isImportDeclaration(s)) continue;
    if (
      ts.isExportDeclaration(s) &&
      s.moduleSpecifier &&
      ts.isStringLiteral(s.moduleSpecifier)
    ) {
      const modSpec = s.moduleSpecifier.text;
      if (emptyHelperSpecifiers.has(modSpec)) continue;

      // Rewrite named re-exports against child's surviving exports
      const childExports = childSurvivingExports.get(modSpec);
      if (
        childExports &&
        s.exportClause &&
        ts.isNamedExports(s.exportClause)
      ) {
        const surviving = s.exportClause.elements.filter((spec) =>
          childExports.has(
            (spec.propertyName ?? spec.name).text,
          ),
        );
        if (surviving.length === 0) continue; // all specifiers dead
        if (surviving.length < s.exportClause.elements.length) {
          // Rewrite the export declaration with only surviving specifiers
          const newClause = ts.factory.updateNamedExports(
            s.exportClause,
            surviving,
          );
          const newDecl = ts.factory.updateExportDeclaration(
            s,
            s.modifiers,
            s.isTypeOnly,
            newClause,
            s.moduleSpecifier,
            s.attributes,
          );
          nonImportStatements.push(newDecl);
          continue;
        }
      }
    }
    nonImportStatements.push(s);
  }

  // Run dead-binding elimination (no mini-file — shared analyzer has full scope)
  const elimination = eliminateDeadStatements(
    nonImportStatements,
    deadSymbols,
    analyzer,
    fileName,
  );

  // Collect surviving exports from surviving statements
  const survivingExports = collectSurvivingExportsFromStatements(
    elimination.survivingStatements,
  );

  // A helper is empty only when no runtime statements survived elimination.
  // Side-effect modules (e.g. polyfills) have no exports but DO have surviving
  // statements — they must NOT be marked empty.
  // Type-only survivors (type aliases, interfaces, type-only exports) do not count as runtime.
  const runtimeSurvivors = elimination.survivingStatements.filter((s) => {
    if (ts.isTypeAliasDeclaration(s) || ts.isInterfaceDeclaration(s)) return false;
    if (ts.isExportDeclaration(s) && s.isTypeOnly) return false;
    return true;
  });
  const isEmpty = runtimeSurvivors.length === 0;

  if (isEmpty) {
    return {
      outputText: "",
      survivingExports: new Set(),
      envVars: [],
      isEmpty: true,
      nestedHelpers,
      warnings,
    };
  }

  // Filter out empty helper imports before rewriting
  const filteredClassified = classified.filter(
    (ci) => !emptyHelperSpecifiers.has(ci.moduleSpecifier),
  );

  // Rewrite imports (symbol-based pruning)
  const dummyFile = ts.createSourceFile("output.ts", "", ts.ScriptTarget.Latest, true);
  const { imports: rewrittenImports } = rewriteImports(
    filteredClassified,
    packageName,
    deadSymbols,
    analyzer,
  );
  const importTexts = rewrittenImports.map((imp) =>
    printer.printNode(ts.EmitHint.Unspecified, imp, dummyFile),
  );

  // Print surviving statements from the analyzer's sourceFile.
  // Strip any leading copyright/license comment lines from the first statement —
  // the printer emits the node's leading trivia which may contain the original
  // file-level copyright header, but we prepend our own below.
  const stmtTexts = elimination.survivingStatements.map((s, index) => {
    const text = printer.printNode(ts.EmitHint.Unspecified, s, analyzer.sourceFile);
    if (index !== 0) return text;
    return text.replace(/^(?:\/\/ Copyright[^\n]*\n|\/\/ Licensed[^\n]*\n)*\n?/, "");
  });

  // Assemble output
  const lines: string[] = [];
  lines.push("// Copyright (c) Microsoft Corporation.");
  lines.push("// Licensed under the MIT License.");
  lines.push("");
  lines.push("/**");
  lines.push(" * @azsdk-util true");
  lines.push(" */");
  lines.push("");

  for (const imp of importTexts) {
    lines.push(imp);
  }
  if (importTexts.length > 0) lines.push("");

  for (const stmt of stmtTexts) {
    lines.push(stmt);
  }
  lines.push("");

  const outputText = lines.join("\n");

  return {
    outputText,
    survivingExports,
    envVars: extractEnvVarNames(outputText),
    isEmpty: false,
    nestedHelpers,
    warnings,
  };
}
