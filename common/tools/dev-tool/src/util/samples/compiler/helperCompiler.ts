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
import { eliminateDeadBindings } from "./deadBindingEliminator.js";
import { rewriteImports } from "./importRewriter.js";

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
}

/** Callback to resolve a helper import specifier to source text. */
export type HelperResolver = (
  fromFile: string,
  specifier: string,
) => ResolvedHelper | undefined;

/**
 * Collect export names from surviving top-level statements.
 */
function collectSurvivingExports(sourceFile: ts.SourceFile): Set<string> {
  const exports = new Set<string>();

  for (const stmt of sourceFile.statements) {
    const modifiers = ts.canHaveModifiers(stmt) ? ts.getModifiers(stmt) : undefined;
    const hasExport = modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!hasExport) continue;

    if (ts.isFunctionDeclaration(stmt) && stmt.name) {
      exports.add(stmt.name.text);
    } else if (ts.isClassDeclaration(stmt) && stmt.name) {
      exports.add(stmt.name.text);
    } else if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) {
          exports.add(decl.name.text);
        }
      }
    } else if (ts.isTypeAliasDeclaration(stmt)) {
      exports.add(stmt.name.text);
    } else if (ts.isInterfaceDeclaration(stmt)) {
      exports.add(stmt.name.text);
    } else if (ts.isEnumDeclaration(stmt)) {
      exports.add(stmt.name.text);
    }
  }

  return exports;
}

/**
 * Get all binding names introduced by an import declaration.
 */
function getImportBindings(node: ts.ImportDeclaration): string[] {
  const names: string[] = [];
  const clause = node.importClause;
  if (!clause) return names;
  if (clause.name) names.push(clause.name.text);
  if (clause.namedBindings) {
    if (ts.isNamedImports(clause.namedBindings)) {
      for (const spec of clause.namedBindings.elements) {
        names.push(spec.name.text);
      }
    } else if (ts.isNamespaceImport(clause.namedBindings)) {
      names.push(clause.namedBindings.name.text);
    }
  }
  return names;
}

/**
 * Extract environment variable names from source text.
 */
function extractEnvVars(text: string): string[] {
  const vars = new Set<string>();
  for (const m of text.matchAll(/process\.env\.([A-Za-z_][A-Za-z0-9_]*)/g)) vars.add(m[1]);
  for (const m of text.matchAll(/process\.env\["([A-Za-z_][A-Za-z0-9_]*)"\]/g)) vars.add(m[1]);
  for (const m of text.matchAll(/process\.env\['([A-Za-z_][A-Za-z0-9_]*)'\]/g)) vars.add(m[1]);
  return [...vars].sort();
}

/**
 * Compile a local helper file.
 *
 * @param sourceText - The helper file's source text
 * @param packageName - Package name for source-code import rewriting
 * @param fileName - File name for error messages and cycle detection
 * @param resolveHelper - Optional callback to resolve nested helper imports
 * @param visited - Set of canonical paths already being compiled (cycle detection)
 */
export function compileHelper(
  sourceText: string,
  packageName: string,
  fileName: string,
  resolveHelper?: HelperResolver,
  visited?: Set<string>,
): CompiledHelper {
  const currentVisited = visited ?? new Set<string>();
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // Parse
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  // Classify imports
  const classified = classifyImports(sourceFile);

  // Collect dead bindings from test imports
  const deadBindings = new Set<string>();
  for (const ci of classified) {
    if (ci.category !== "test") continue;
    for (const name of getImportBindings(ci.node)) {
      deadBindings.add(name);
    }
  }

  // Resolve nested localHelper imports
  const nestedHelpers = new Map<string, CompiledHelper>();
  const emptyHelperSpecifiers = new Set<string>();

  if (resolveHelper) {
    for (const ci of classified) {
      if (ci.category !== "localHelper") continue;

      const resolved = resolveHelper(fileName, ci.moduleSpecifier);
      if (!resolved) continue;

      // Cycle detection
      if (currentVisited.has(resolved.canonicalPath)) continue;

      currentVisited.add(resolved.canonicalPath);
      const nested = compileHelper(
        resolved.sourceText,
        packageName,
        resolved.canonicalPath,
        resolveHelper,
        currentVisited,
      );

      if (nested.isEmpty) {
        // Pure test helper: mark all its import bindings as dead
        for (const name of getImportBindings(ci.node)) {
          deadBindings.add(name);
        }
        emptyHelperSpecifiers.add(ci.moduleSpecifier);
      } else {
        nestedHelpers.set(ci.moduleSpecifier, nested);
      }
    }
  }

  // Separate imports from other statements for dead-binding elimination
  const nonImportStatements = sourceFile.statements.filter(
    (s) => !ts.isImportDeclaration(s),
  );

  // Run dead-binding elimination on non-import statements
  const miniText = nonImportStatements
    .map((s) => printer.printNode(ts.EmitHint.Unspecified, s, sourceFile))
    .join("\n");
  const miniFile = ts.createSourceFile("helper-mini.ts", miniText, ts.ScriptTarget.Latest, true);

  const elimination = eliminateDeadBindings(miniFile, deadBindings, fileName, {
    treatTangledAsDead: true,
  });

  // Collect surviving exports
  const survivingExports = collectSurvivingExports(elimination.outputFile);

  // If nothing survived that's exported, this is an empty helper
  const hasAnySurvivors = elimination.outputFile.statements.length > 0;
  const isEmpty = !hasAnySurvivors || survivingExports.size === 0;

  if (isEmpty) {
    return {
      outputText: "",
      survivingExports: new Set(),
      envVars: [],
      isEmpty: true,
      nestedHelpers,
    };
  }

  // Merge dead bindings with eliminated ones for import pruning
  const allDead = new Set([...deadBindings, ...elimination.eliminatedBindings]);

  // Filter out empty helper imports before rewriting
  const filteredClassified = classified.filter(
    (ci) => !emptyHelperSpecifiers.has(ci.moduleSpecifier),
  );

  // Rewrite imports
  const dummyFile = ts.createSourceFile("output.ts", "", ts.ScriptTarget.Latest, true);
  const { imports: rewrittenImports } = rewriteImports(
    filteredClassified,
    packageName,
    allDead,
    sourceFile,
  );
  const importTexts = rewrittenImports.map((imp) =>
    printer.printNode(ts.EmitHint.Unspecified, imp, dummyFile),
  );

  // Print surviving statements
  const stmtTexts = [...elimination.outputFile.statements].map((s) =>
    printer.printNode(ts.EmitHint.Unspecified, s, elimination.outputFile),
  );

  // Assemble output
  const lines: string[] = [];
  lines.push("// Copyright (c) Microsoft Corporation.");
  lines.push("// Licensed under the MIT License.");
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
    envVars: extractEnvVars(outputText),
    isEmpty: false,
    nestedHelpers,
  };
}
