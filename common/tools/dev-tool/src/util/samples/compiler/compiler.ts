// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Integration module for the sample-tests compiler.
 *
 * Orchestrates the full pipeline: parse → substitute → classify → eliminate → generate → assemble.
 * Transforms a vitest-based sample-test file into publishable sample code.
 *
 * PHASE ARCHITECTURE:
 * - Phase 1 (Parse): Raw source → ParsedSampleTestFile + SourceFile
 * - Phase 2 (Substitute): Replace forPublishing/sampleOnly with their published expressions
 * - Phase 3 (Analyze): Create scope-aware symbol analyzer for substituted code
 * - Phase 4 (Classify & Resolve): Categorize imports, resolve helpers, identify dead symbols
 * - Phase 5 (Eliminate): Remove dead statements per scope, cascade dependencies
 * - Phase 6 (Validate): Check forPublishing expressions against final dead symbols
 * - Phase 7 (Generate): Rewrite imports, assemble output text
 * - Phase 8 (Finalize): Extract snippets, env vars, post-process
 *
 * Each phase produces explicit outputs consumed by later phases. The deadSymbols set
 * is the main cross-phase state, accumulated through classify → helper resolution → DCE.
 *
 * DESIGN: beforeAll/beforeEach semantics
 *
 * Tests use beforeEach to recreate clients for recording/isolation between test cases.
 * But samples demonstrate real-world usage where you create resources once and reuse them.
 * Running beforeEach per-operation would be wasteful and unlike real application code.
 *
 * For multi-it samples, beforeAll+beforeEach run once at main() start, then all functions
 * execute with afterEach running after each function and afterAll at the end.
 */

import path from "node:path";
import ts from "typescript";
import type { CompiledSample, ClassifiedImport, SampleMetadata, Substitution } from "./types.js";
import { CompilerError, type ParsedSampleTestFile } from "./types.js";
import { parseSampleTestFile } from "./parser.js";
import { classifyImports, type SourceImportPredicate } from "./importClassifier.js";
import { substituteTestPublishing, type CombinedSubstitutionResult } from "./substitutor.js";
import { eliminateDeadStatements } from "./deadBindingEliminator.js";
import { createAnalyzer, resolveNamesToSymbols, type BindingAnalyzer } from "./bindingAnalyzer.js";
import { descriptionToFunctionName } from "./codeGenerator.js";
import { rewriteImports } from "./importRewriter.js";
import { promoteLetToConst } from "./letConstPromoter.js";
import { compileHelper } from "./helperCompiler.js";
import { extractEnvVarNames } from "./envVarExtractor.js";
import type { HelperResolver, CompiledHelper } from "./helperCompiler.js";
import type { ParsedHook, ParsedItBlock } from "./types.js";

// ── Internal Helpers ─────────────────────────────────────────────────────────

/**
 * Eliminate dead code from a scope and collect surviving statements.
 * Mutates deadSymbols with cascaded deaths. Returns surviving statements as text.
 */
function eliminateScope(
  body: readonly ts.Statement[],
  deadSymbols: Set<ts.Symbol>,
  analyzer: BindingAnalyzer,
  fileName: string,
  printer: ts.Printer,
  allSurvivingNodes: ts.Statement[],
  trailingComments?: string,
): string[] {
  const result = eliminateDeadStatements(body, deadSymbols, analyzer, fileName);
  for (const sym of result.newlyDeadSymbols) {
    deadSymbols.add(sym);
  }
  const texts: string[] = [];
  for (const s of result.survivingStatements) {
    allSurvivingNodes.push(s);
    texts.push(printer.printNode(ts.EmitHint.Unspecified, s, analyzer.sourceFile));
  }
  if (trailingComments) {
    texts.push(trailingComments);
  }
  return texts;
}

/**
 * Eliminate dead code from a list of hooks, returning combined surviving text.
 */
function eliminateHooks(
  hooks: readonly ParsedHook[],
  deadSymbols: Set<ts.Symbol>,
  analyzer: BindingAnalyzer,
  fileName: string,
  printer: ts.Printer,
  allSurvivingNodes: ts.Statement[],
): string[] {
  const texts: string[] = [];
  for (const hook of hooks) {
    const hookTexts = eliminateScope(
      hook.body,
      deadSymbols,
      analyzer,
      fileName,
      printer,
      allSurvivingNodes,
      hook.trailingComments,
    );
    texts.push(...hookTexts);
  }
  return texts;
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Cache for compiled helpers, keyed by canonical path. Shared across sample compilations. */
export type HelperCache = Map<string, CompiledHelper>;

export interface CompileOptions {
  /** Package name for import rewriting (e.g., "@azure/storage-blob") */
  packageName: string;
  /** File name for error messages */
  fileName?: string;
  /**
   * Resolve a local helper import to its source text.
   * Called for each "localHelper" classified import.
   * Return undefined if the file cannot be resolved (import kept as-is).
   */
  resolveHelper?: HelperResolver;
  /**
   * Determine if a resolved import path points to source code (vs local helper).
   * Receives the fully resolved absolute path of the import target.
   * Source code imports are rewritten to use the package name.
   * Helper imports are compiled and bundled with the sample.
   *
   * Required for sample compilation. Typically checks if the resolved path
   * is under the project's src/ directory.
   */
  isSourceImport: (resolvedPath: string) => boolean;
  /**
   * Target platform for this sample. When "browser", the sample is marked
   * with @azsdk-skip-javascript automatically (browser samples are TypeScript-only
   * in published output since they require a bundler).
   * Defaults to "node" (compatible with both Node.js and browser when bundled).
   */
  platform?: "node" | "browser";
  /**
   * Shared helper compilation cache. When provided, compiled helpers are cached
   * across multiple sample compilations, avoiding redundant work when many samples
   * import the same helpers.
   */
  helperCache?: HelperCache;
  /**
   * When true, unresolved local helper imports cause a CompilerError instead of a warning.
   * Use in production/integration paths to ensure all helpers are properly resolved.
   */
  strict?: boolean;
}

/**
 * Compile a sample-test source file into publishable sample code.
 */
export function compileSampleTest(sourceText: string, options: CompileOptions): CompiledSample {
  const {
    packageName,
    fileName = "<sample-test>",
    resolveHelper,
    isSourceImport,
    platform,
    helperCache,
    strict,
  } = options;
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // Step 1: Parse source text into AST
  const sourceFile = createSourceFile(fileName, sourceText);

  // Step 2: Parse structure for metadata and describe/it layout
  const parsed = parseSampleTestFile(sourceFile, fileName);
  if (!parsed) {
    throw new CompilerError("No description found in file JSDoc comment", fileName);
  }

  // Auto-set skipJavascript for browser-platform samples (they require a bundler,
  // so CommonJS JS output is not useful for end users)
  if (platform === "browser") {
    parsed.metadata.skipJavascript = true;
  }

  // Step 3: Substitute forPublishing and sampleOnly calls in a single pass
  // Uses symbol-based matching via TypeChecker to avoid false matches on shadowed locals.
  // Combined substitution eliminates the need for intermediate print/reparse cycles.
  const initialAnalyzer = createAnalyzer(sourceText, fileName);
  const { transformedFile, substitutions } = substituteTestPublishing(
    initialAnalyzer.sourceFile,
    initialAnalyzer.checker,
    fileName,
  );

  // Step 4: Create ONE analyzer for the substituted file (scope-aware symbol resolution)
  const substitutedText = printer.printFile(transformedFile);
  const analyzer = createAnalyzer(substitutedText, fileName);
  const subParsed = parseSampleTestFile(analyzer.sourceFile, fileName);
  if (!subParsed) {
    throw new CompilerError("Internal error: re-parse failed after substitution", fileName);
  }

  // Step 5: Classify imports and collect dead binding symbols from test imports
  // Pass the real fileName for path resolution (analyzer.sourceFile uses synthetic name)
  const classified = classifyImports(analyzer.sourceFile, isSourceImport, fileName);
  const deadSymbols = collectDeadSymbols(classified, analyzer);

  // Step 5a: Resolve local helper imports (import graph following)
  const helperFiles = new Map<string, string>();
  const helperEnvVars: string[] = [];
  const emptyHelperSpecifiers = new Set<string>();
  const warnings: string[] = [];
  // Surface parser warnings
  if (parsed.warnings) warnings.push(...parsed.warnings);
  if (subParsed.warnings) warnings.push(...subParsed.warnings);

  // Relativize a canonical (absolute) helper path to be relative to the sample file's directory.
  const sampleDir = path.dirname(fileName);
  const storedHelperKeys = new Set<string>();
  function toRelativeHelperKey(canonicalPath: string): string {
    const rel = path.relative(sampleDir, canonicalPath).split(path.sep).join("/");
    return rel.startsWith(".") ? rel : "./" + rel;
  }

  if (resolveHelper) {
    const visited = new Set<string>();
    // Use shared cache if provided, otherwise create a local one
    const effectiveCache = helperCache ?? new Map<string, CompiledHelper>();
    for (const ci of classified) {
      if (ci.category !== "localHelper") continue;

      const resolved = resolveHelper(fileName, ci.moduleSpecifier);
      if (!resolved) {
        if (strict) {
          throw new CompilerError(
            `Unresolved local helper import "${ci.moduleSpecifier}" in "${fileName}"`,
            fileName,
          );
        }
        warnings.push(`Could not resolve local helper "${ci.moduleSpecifier}" from "${fileName}"`);
        continue;
      }

      let helper: CompiledHelper;
      const cached = effectiveCache.get(resolved.canonicalPath);
      if (cached) {
        helper = cached;
        // Cache hit: still need to populate per-sample state (helperFiles, envVars)
        // but don't re-emit warnings (they were already surfaced on first compilation)
      } else {
        visited.add(resolved.canonicalPath);

        helper = compileHelper(
          resolved.sourceText,
          packageName,
          resolved.canonicalPath,
          isSourceImport,
          resolveHelper,
          visited,
          effectiveCache, // Pass cache for nested helper reuse
          strict, // Propagate strict mode to nested helpers
        );
        effectiveCache.set(resolved.canonicalPath, helper);

        // Surface warnings from helper compilations (only once per helper)
        warnings.push(...helper.warnings);
      }

      // Populate helperFiles and envVars for this sample (both cache hit and miss)
      if (!helper.isEmpty) {
        // Helper has survivors (runtime or type-only): store compiled output
        const relKey = toRelativeHelperKey(resolved.canonicalPath);
        if (!storedHelperKeys.has(resolved.canonicalPath)) {
          storedHelperKeys.add(resolved.canonicalPath);
          helperFiles.set(relKey, helper.outputText);
          helperEnvVars.push(...helper.envVars);
        }

        // Collect transitive nested helper files (already flattened by compileHelper)
        for (const [nestedCanonical, nestedHelper] of helper.nestedHelpers) {
          if (!nestedHelper.isEmpty && !storedHelperKeys.has(nestedCanonical)) {
            storedHelperKeys.add(nestedCanonical);
            helperFiles.set(toRelativeHelperKey(nestedCanonical), nestedHelper.outputText);
            helperEnvVars.push(...nestedHelper.envVars);
          }
        }
      }

      // Process THIS import's specifiers against the (possibly cached) result
      // Only mark bindings as dead if the helper is truly empty (no survivors at all).
      // Type-only helpers still need their import bindings preserved.
      if (helper.isEmpty) {
        for (const sym of analyzer.getImportBindingSymbols(ci.node)) {
          deadSymbols.add(sym);
        }
        emptyHelperSpecifiers.add(ci.moduleSpecifier);
      }
    }
  }

  // Filter out empty helper imports before further processing
  const filteredClassified =
    emptyHelperSpecifiers.size > 0
      ? classified.filter((ci) => !emptyHelperSpecifiers.has(ci.moduleSpecifier))
      : classified;

  // Step 5b: Early validation - check forPublishing expressions against import-level dead bindings
  // This catches obvious errors early (before DCE). Full validation happens at Step 6b after DCE.
  // Pass describe-scope statements so we can find symbols declared inside describe block.
  //
  // Note: Filter out compiler-processed constructs (sampleOnly, forPublishing) from free variables.
  // These are marked as dead bindings (test imports) but are handled by the compiler, not DCE.
  // The freeVariables were captured before sampleOnly substitution, so they may include stale refs.
  const compilerProcessedNames = new Set(["sampleOnly", "forPublishing"]);
  for (const sub of substitutions) {
    const filteredFreeVars = [...sub.freeVariables].filter((n) => !compilerProcessedNames.has(n));
    const freeSymbols = resolveNamesToSymbols(
      analyzer,
      filteredFreeVars,
      subParsed.describeStatements,
    );
    for (const sym of freeSymbols) {
      if (deadSymbols.has(sym)) {
        throw new CompilerError(
          `Symbol "${sym.name}" in forPublishing expression is not available after cleanup (it was removed as test infrastructure)`,
          fileName,
        );
      }
    }
  }

  // Step 6: Eliminate dead statements per scope (shared analyzer, no mini-files)
  // Describe statements first — cascade feeds other scopes
  //
  // Separate type declarations (interfaces, type aliases) from runtime statements.
  // Unlike helpers where only exported types are preserved, in samples we keep ALL
  // local type declarations since they may be used as annotations in surviving code.
  const describeTypeDeclarations: ts.Statement[] = [];
  const describeRuntimeStatements: ts.Statement[] = [];
  for (const s of subParsed.describeStatements) {
    if (ts.isInterfaceDeclaration(s) || ts.isTypeAliasDeclaration(s)) {
      describeTypeDeclarations.push(s);
    } else {
      describeRuntimeStatements.push(s);
    }
  }

  // Run dead-binding elimination only on runtime statements
  const describeResult = eliminateDeadStatements(
    describeRuntimeStatements,
    deadSymbols,
    analyzer,
    fileName,
  );
  // Accumulate newly dead symbols from cascade
  for (const sym of describeResult.newlyDeadSymbols) {
    deadSymbols.add(sym);
  }

  // Combine type declarations with surviving runtime statements
  const allSurvivingDescribeStatements = [
    ...describeTypeDeclarations,
    ...describeResult.survivingStatements,
  ];

  // Collect all surviving AST nodes for symbol extraction (before printing to text)
  const allSurvivingNodes: ts.Statement[] = [...allSurvivingDescribeStatements];

  // Keep all surviving describe statements in original order AND extract var-only subset for
  // let→const promotion. The ordered list is used during assembly so that non-var statements
  // (expression statements, function declarations, etc.) stay in their original positions.
  const survivingDescribeTexts = allSurvivingDescribeStatements.map((s) =>
    printer.printNode(ts.EmitHint.Unspecified, s, analyzer.sourceFile),
  );
  const survivingVarTexts = allSurvivingDescribeStatements
    .filter(ts.isVariableStatement)
    .map((s) => printer.printNode(ts.EmitHint.Unspecified, s, analyzer.sourceFile));

  // Top-level type declarations (interfaces, type aliases) are preserved as-is
  const topLevelTypeTexts = subParsed.topLevelTypeDeclarations.map((s) =>
    printer.printNode(ts.EmitHint.Unspecified, s, analyzer.sourceFile),
  );

  // Eliminate dead code from hooks (beforeAll/beforeEach run as preamble, afterEach/afterAll as cleanup)
  const beforeAllTexts = eliminateHooks(
    subParsed.beforeAllHooks,
    deadSymbols,
    analyzer,
    fileName,
    printer,
    allSurvivingNodes,
  );
  const beforeEachTexts = eliminateHooks(
    subParsed.beforeEachHooks,
    deadSymbols,
    analyzer,
    fileName,
    printer,
    allSurvivingNodes,
  );

  // Eliminate dead code from each it-block body
  const itBlockTexts: string[][] = [];
  for (const itBlock of subParsed.itBlocks) {
    const texts = eliminateScope(
      itBlock.body,
      deadSymbols,
      analyzer,
      fileName,
      printer,
      allSurvivingNodes,
      itBlock.trailingComments,
    );
    itBlockTexts.push(texts);
  }

  // Cleanup hooks
  const afterEachTexts = eliminateHooks(
    subParsed.afterEachHooks,
    deadSymbols,
    analyzer,
    fileName,
    printer,
    allSurvivingNodes,
  );
  const afterAllTexts = eliminateHooks(
    subParsed.afterAllHooks,
    deadSymbols,
    analyzer,
    fileName,
    printer,
    allSurvivingNodes,
  );

  // Step 6b: Validate forPublishing expressions against extended dead set (includes cascaded)
  // Pass describe-scope statements so we can find symbols declared inside describe block
  // (not just top-level file statements).
  // Filter out compiler-processed names (same as Step 5b) to avoid false positives from
  // stale freeVariables captured before sampleOnly substitution.
  for (const sub of substitutions) {
    const filteredFreeVars = [...sub.freeVariables].filter((n) => !compilerProcessedNames.has(n));
    const freeSymbols = resolveNamesToSymbols(
      analyzer,
      filteredFreeVars,
      subParsed.describeStatements,
    );
    for (const sym of freeSymbols) {
      if (deadSymbols.has(sym)) {
        throw new CompilerError(
          `Symbol "${sym.name}" in forPublishing expression is not available after cleanup (it was removed as test infrastructure)`,
          fileName,
        );
      }
    }
  }

  // Step 7: Rewrite imports
  const dummyFile = createSourceFile("output.ts", "");
  // Collect all symbols referenced in surviving AST nodes for stale-import pruning.
  // Any external/localHelper import binding that is not referenced in the surviving AST
  // was eliminated by substitution and should be dropped from the output.
  // Uses AST-based symbol extraction instead of regex on text for precision.
  const referencedSymbols = new Set<ts.Symbol>();
  for (const node of allSurvivingNodes) {
    for (const sym of analyzer.getReferencedSymbols(node)) {
      referencedSymbols.add(sym);
    }
  }
  const { imports: rewrittenImports } = rewriteImports(
    filteredClassified,
    packageName,
    deadSymbols,
    analyzer,
    referencedSymbols,
  );
  const importTexts = rewrittenImports.map((imp) =>
    printer.printNode(ts.EmitHint.Unspecified, imp, dummyFile),
  );

  // Step 8: Build function descriptors from it blocks (deduplicate names)
  const usedNames = new Set<string>();
  const functions = subParsed.itBlocks.map((itBlock, i) => {
    let name = descriptionToFunctionName(itBlock.description);
    if (usedNames.has(name)) {
      let suffix = 2;
      while (usedNames.has(`${name}${suffix}`)) suffix++;
      name = `${name}${suffix}`;
    }
    usedNames.add(name);
    return { name, bodyTexts: itBlockTexts[i] };
  });

  // Step 9: Assemble final output (see module header for beforeAll/beforeEach semantics)
  if (functions.length > 1 && beforeEachTexts.length > 0) {
    warnings.push(
      "Multi-it sample has beforeEach hook. Note: beforeEach runs once at start (not per-function) " +
        "because samples demonstrate production usage patterns. Consider using single-it or moving " +
        "per-operation setup into each it-block if fresh state is required.",
    );
  }
  const rawOutputText = assembleOutput(
    parsed.metadata,
    importTexts,
    topLevelTypeTexts,
    survivingDescribeTexts,
    survivingVarTexts,
    functions,
    [...beforeAllTexts, ...beforeEachTexts],
    afterEachTexts,
    afterAllTexts,
    platform,
  );

  // Step 10: Extract snippets and environment variables (before stripping markers)
  const snippets = extractSnippets(rawOutputText, fileName);
  const envVars = [...extractEnvVarNames(rawOutputText), ...helperEnvVars];
  // Deduplicate and sort
  const uniqueEnvVars = [...new Set(envVars)].sort();

  // Step 11: Post-process — strip test-only comments, normalize whitespace
  const outputText = postProcessOutput(rawOutputText);

  return {
    outputText,
    snippets,
    envVars: uniqueEnvVars,
    metadata: parsed.metadata,
    warnings,
    helperFiles,
  };
}

// ── Helpers ──────────────────────────────────────────────────────────

function createSourceFile(fileName: string, text: string): ts.SourceFile {
  return ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

/**
 * Collect dead symbols from test-category imports using the shared analyzer.
 */
function collectDeadSymbols(
  classified: ClassifiedImport[],
  analyzer: BindingAnalyzer,
): Set<ts.Symbol> {
  const dead = new Set<ts.Symbol>();
  for (const ci of classified) {
    if (ci.category !== "test") continue;
    for (const sym of analyzer.getImportBindingSymbols(ci.node)) {
      dead.add(sym);
    }
  }
  return dead;
}

/**
 * Assemble the final output text from its constituent pieces.
 */
function assembleOutput(
  metadata: SampleMetadata,
  importTexts: string[],
  topLevelTypeTexts: string[],
  describeTexts: string[],
  describeVarTexts: string[],
  functions: Array<{ name: string; bodyTexts: string[] }>,
  mainPreambleTexts: string[],
  afterEachTexts: string[],
  afterAllTexts: string[],
  platform?: "node" | "browser",
): string {
  const lines: string[] = [];
  const hasCleanup = afterEachTexts.length > 0 || afterAllTexts.length > 0;

  // Copyright header
  lines.push("// Copyright (c) Microsoft Corporation.");
  lines.push("// Licensed under the MIT License.");
  lines.push("");

  // Summary JSDoc with @azsdk-* tags
  lines.push("/**");
  lines.push(` * @summary ${metadata.summary}`);
  if (metadata.weight !== undefined) {
    lines.push(` * @azsdk-weight ${metadata.weight}`);
  }
  if (metadata.skipJavascript) {
    lines.push(` * @azsdk-skip-javascript`);
  }
  if (metadata.ignore) {
    lines.push(` * @azsdk-ignore`);
  }
  lines.push(" */");
  lines.push("");

  // Imports
  for (const imp of importTexts) {
    lines.push(imp);
  }
  if (importTexts.length > 0) {
    lines.push("");
  }

  // Top-level type declarations (interfaces, type aliases from outside describe)
  for (const typeDecl of topLevelTypeTexts) {
    lines.push(typeDecl);
  }
  if (topLevelTypeTexts.length > 0) {
    lines.push("");
  }

  if (functions.length === 1) {
    // Single-it optimization: inline everything into main(), promote let→const
    const { remainingVars, statements: promotedPreamble } = promoteLetToConst(
      describeVarTexts,
      mainPreambleTexts,
      functions[0].bodyTexts,
    );

    // Determine which var texts were promoted (so we can skip them in the ordered list)
    const remainingVarSet = new Set(remainingVars);
    const promotedVarSet = new Set(describeVarTexts.filter((v) => !remainingVarSet.has(v)));

    lines.push("export async function main(): Promise<void> {");

    // Describe-scope statements in original order, skipping promoted vars
    for (const s of describeTexts) {
      if (promotedVarSet.has(s)) continue;
      for (const line of s.split("\n")) {
        lines.push("  " + line);
      }
    }

    // Promoted preamble statements (with promoted consts interleaved in order)
    for (const stmt of promotedPreamble) {
      for (const line of stmt.split("\n")) {
        lines.push("  " + line);
      }
    }

    if (hasCleanup) {
      // Wrap body in try/finally for cleanup
      lines.push("  try {");
      for (const stmt of functions[0].bodyTexts) {
        for (const line of stmt.split("\n")) {
          lines.push("    " + line);
        }
      }
      lines.push("  } finally {");
      // afterEach cleanup
      for (const stmt of afterEachTexts) {
        for (const line of stmt.split("\n")) {
          lines.push("    " + line);
        }
      }
      // afterAll cleanup
      for (const stmt of afterAllTexts) {
        for (const line of stmt.split("\n")) {
          lines.push("    " + line);
        }
      }
      lines.push("  }");
    } else {
      // No cleanup, inline body directly
      for (const stmt of functions[0].bodyTexts) {
        for (const line of stmt.split("\n")) {
          lines.push("  " + line);
        }
      }
    }

    lines.push("}");
    lines.push("");
  } else {
    // Multi-it: module-level describe statements (in original order) + named functions + main()
    if (describeTexts.length > 0) {
      for (const v of describeTexts) {
        lines.push(v);
      }
      lines.push("");
    }

    for (const fn of functions) {
      lines.push(`async function ${fn.name}() {`);
      for (const stmt of fn.bodyTexts) {
        for (const line of stmt.split("\n")) {
          lines.push("  " + line);
        }
      }
      lines.push("}");
      lines.push("");
    }

    lines.push("export async function main(): Promise<void> {");
    for (const stmt of mainPreambleTexts) {
      for (const line of stmt.split("\n")) {
        lines.push("  " + line);
      }
    }

    if (hasCleanup) {
      // Wrap all function calls in try/finally
      lines.push("  try {");
      for (const fn of functions) {
        // For multi-it with afterEach, wrap each call individually
        if (afterEachTexts.length > 0) {
          lines.push(`    try {`);
          lines.push(`      await ${fn.name}();`);
          lines.push(`    } finally {`);
          for (const stmt of afterEachTexts) {
            for (const line of stmt.split("\n")) {
              lines.push("      " + line);
            }
          }
          lines.push(`    }`);
        } else {
          lines.push(`    await ${fn.name}();`);
        }
      }
      lines.push("  } finally {");
      // afterAll cleanup at the end
      for (const stmt of afterAllTexts) {
        for (const line of stmt.split("\n")) {
          lines.push("    " + line);
        }
      }
      lines.push("  }");
    } else {
      for (const fn of functions) {
        lines.push(`  await ${fn.name}();`);
      }
    }
    lines.push("}");
    lines.push("");
  }

  // catch handler (platform-aware)
  if (platform === "browser") {
    // Browser samples shouldn't use process.exit()
    lines.push("main().catch((error) => {");
    lines.push("  console.error(error);");
    lines.push("});");
  } else {
    // Node.js samples use process.exit(1) for non-zero exit on error
    lines.push("main().catch((error) => {");
    lines.push("  console.error(error);");
    lines.push("  process.exit(1);");
    lines.push("});");
  }
  lines.push("");

  return lines.join("\n");
}

/**
 * Post-process assembled output: strip test-only comments, normalize whitespace.
 */
function postProcessOutput(text: string): string {
  // Convert // @ts-preserve-whitespace comments to blank lines
  let result = text.replace(/^[ \t]*\/\/\s*@ts-preserve-whitespace\s*$/gm, "");

  // Strip // @snippet and // @snippet-end markers
  result = result.replace(/^[ \t]*\/\/\s*@snippet(?:-end)?\s+\S+.*$/gm, "");

  // Remove dead expression statements (e.g., standalone "0;" from forPublishing cleanup)
  result = result.replace(/^[ \t]*0;\s*$/gm, "");

  // Collapse runs of 3+ blank lines down to 2
  result = result.replace(/\n{3,}/g, "\n\n");

  return result;
}

/**
 * Extract snippet regions delimited by `// @snippet Name` and `// @snippet-end Name`.
 *
 * Validates:
 * - No nested snippet markers
 * - No unclosed snippet markers
 * - No stray @snippet-end without matching @snippet
 * - No duplicate snippet names
 */
function extractSnippets(text: string, fileName?: string): Map<string, string> {
  const snippets = new Map<string, string>();
  const lines = text.split("\n");
  let current: { name: string; lines: string[]; lineNumber: number } | null = null;
  const startRegex = /\/\/\s*@snippet\s+(\S+)/;
  const endRegex = /\/\/\s*@snippet-end\s+(\S+)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const startMatch = line.match(startRegex);
    const endMatch = line.match(endRegex);

    if (endMatch) {
      const endName = endMatch[1];
      if (!current) {
        throw new CompilerError(
          `Stray "@snippet-end ${endName}" without matching "@snippet ${endName}"`,
          fileName ?? "<unknown>",
          i + 1,
        );
      }
      if (endName !== current.name) {
        throw new CompilerError(
          `Mismatched snippet end: "@snippet-end ${endName}" does not match "@snippet ${current.name}" (opened at line ${current.lineNumber})`,
          fileName ?? "<unknown>",
          i + 1,
        );
      }
      // Check for duplicate before storing
      if (snippets.has(current.name)) {
        throw new CompilerError(
          `Duplicate snippet name "${current.name}" — a snippet with this name was already defined`,
          fileName ?? "<unknown>",
          current.lineNumber,
        );
      }
      snippets.set(current.name, current.lines.join("\n"));
      current = null;
    } else if (startMatch) {
      if (current) {
        throw new CompilerError(
          `Nested snippet marker "@snippet ${startMatch[1]}" found inside "@snippet ${current.name}" (opened at line ${current.lineNumber})`,
          fileName ?? "<unknown>",
          i + 1,
        );
      }
      current = { name: startMatch[1], lines: [], lineNumber: i + 1 };
    } else if (current) {
      current.lines.push(line);
    }
  }

  if (current) {
    throw new CompilerError(
      `Unclosed snippet marker "@snippet ${current.name}" (opened at line ${current.lineNumber})`,
      fileName ?? "<unknown>",
      current.lineNumber,
    );
  }

  return snippets;
}
