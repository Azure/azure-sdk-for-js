// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Integration module for the sample-tests compiler.
 *
 * Orchestrates the full pipeline: parse → substitute → classify → eliminate → generate → assemble.
 * Transforms a vitest-based sample-test file into publishable sample code.
 */

import path from "node:path";
import ts from "typescript";
import type { CompiledSample, ClassifiedImport, SampleMetadata } from "./types.js";
import { CompilerError } from "./types.js";
import { parseSampleTestFile } from "./parser.js";
import { classifyImports } from "./importClassifier.js";
import { substituteForPublishing, substituteSampleOnly } from "./substitutor.js";
import { eliminateDeadStatements } from "./deadBindingEliminator.js";
import { createAnalyzer, resolveNamesToSymbols, type BindingAnalyzer } from "./bindingAnalyzer.js";
import { descriptionToFunctionName } from "./codeGenerator.js";
import { rewriteImports } from "./importRewriter.js";
import { promoteLetToConst } from "./letConstPromoter.js";
import { compileHelper } from "./helperCompiler.js";
import { extractEnvVarNames } from "./envVarExtractor.js";
import type { HelperResolver, CompiledHelper } from "./helperCompiler.js";

/** Cache for compiled helpers, keyed by canonical path. Shared across sample compilations. */
export type HelperCache = Map<string, { helper: CompiledHelper }>;

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
}

/**
 * Compile a sample-test source file into publishable sample code.
 */
export function compileSampleTest(sourceText: string, options: CompileOptions): CompiledSample {
  const { packageName, fileName = "<sample-test>", resolveHelper, platform, helperCache } = options;
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

  // Step 3: Substitute forPublishing calls across the entire source
  const { transformedFile, substitutions } = substituteForPublishing(sourceFile, fileName);

  // Step 3b: Substitute sampleOnly calls (requires re-parse after forPublishing)
  const step3Text = printer.printFile(transformedFile);
  const step3File = createSourceFile(fileName, step3Text);
  const step3Analyzer = createAnalyzer(step3Text, fileName);
  const { transformedFile: postSampleOnlyFile, replacementCount: sampleOnlyCount } =
    substituteSampleOnly(step3File, step3Analyzer.checker, fileName);

  // Step 4: Print and re-parse to get a clean AST with substitutions applied
  const substitutedText = sampleOnlyCount > 0 ? printer.printFile(postSampleOnlyFile) : step3Text;

  // Step 4b: Create ONE analyzer for the full substituted file (scope-aware symbol resolution)
  const analyzer = createAnalyzer(substitutedText, fileName);
  const subParsed = parseSampleTestFile(analyzer.sourceFile, fileName);
  if (!subParsed) {
    throw new CompilerError("Internal error: re-parse failed after substitution", fileName);
  }

  // Step 5: Classify imports and collect dead binding symbols from test imports
  const classified = classifyImports(analyzer.sourceFile);
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
    const effectiveCache = helperCache ?? new Map<string, { helper: CompiledHelper }>();
    for (const ci of classified) {
      if (ci.category !== "localHelper") continue;

      const resolved = resolveHelper(fileName, ci.moduleSpecifier);
      if (!resolved) {
        warnings.push(`Could not resolve local helper "${ci.moduleSpecifier}" from "${fileName}"`);
        continue;
      }

      let helper: CompiledHelper;
      const cached = effectiveCache.get(resolved.canonicalPath);
      if (cached) {
        helper = cached.helper;
      } else {
        visited.add(resolved.canonicalPath);

        helper = compileHelper(
          resolved.sourceText,
          packageName,
          resolved.canonicalPath,
          resolveHelper,
          visited,
        );
        effectiveCache.set(resolved.canonicalPath, { helper });

        // Surface warnings from helper compilations (only once per helper)
        warnings.push(...helper.warnings);

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

  // Step 5b: Validate that forPublishing expressions don't reference dead bindings
  for (const sub of substitutions) {
    const freeSymbols = resolveNamesToSymbols(analyzer, sub.freeVariables);
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
  const describeResult = eliminateDeadStatements(
    subParsed.describeStatements,
    deadSymbols,
    analyzer,
    fileName,
  );
  // Accumulate newly dead symbols from cascade
  for (const sym of describeResult.newlyDeadSymbols) {
    deadSymbols.add(sym);
  }
  // Keep all surviving describe statements in original order AND extract var-only subset for
  // let→const promotion. The ordered list is used during assembly so that non-var statements
  // (expression statements, function declarations, etc.) stay in their original positions.
  const survivingDescribeTexts = describeResult.survivingStatements.map((s) =>
    printer.printNode(ts.EmitHint.Unspecified, s, analyzer.sourceFile),
  );
  const survivingVarTexts = describeResult.survivingStatements
    .filter(ts.isVariableStatement)
    .map((s) => printer.printNode(ts.EmitHint.Unspecified, s, analyzer.sourceFile));

  // beforeAll hooks — surviving statements become preamble BEFORE beforeEach
  const beforeAllTexts: string[] = [];
  for (const hook of subParsed.beforeAllHooks) {
    const hookResult = eliminateDeadStatements(hook.body, deadSymbols, analyzer, fileName);
    for (const sym of hookResult.newlyDeadSymbols) {
      deadSymbols.add(sym);
    }
    for (const s of hookResult.survivingStatements) {
      beforeAllTexts.push(printer.printNode(ts.EmitHint.Unspecified, s, analyzer.sourceFile));
    }
    if (hook.trailingComments) {
      beforeAllTexts.push(hook.trailingComments);
    }
  }

  // beforeEach hooks — surviving statements become main() preamble
  const beforeEachTexts: string[] = [];
  for (const hook of subParsed.beforeEachHooks) {
    const hookResult = eliminateDeadStatements(hook.body, deadSymbols, analyzer, fileName);
    for (const sym of hookResult.newlyDeadSymbols) {
      deadSymbols.add(sym);
    }
    for (const s of hookResult.survivingStatements) {
      beforeEachTexts.push(printer.printNode(ts.EmitHint.Unspecified, s, analyzer.sourceFile));
    }
    if (hook.trailingComments) {
      beforeEachTexts.push(hook.trailingComments);
    }
  }

  // it block bodies
  const itBlockTexts: string[][] = [];
  for (const itBlock of subParsed.itBlocks) {
    const itResult = eliminateDeadStatements(itBlock.body, deadSymbols, analyzer, fileName);
    for (const sym of itResult.newlyDeadSymbols) {
      deadSymbols.add(sym);
    }
    const texts = itResult.survivingStatements.map((s) =>
      printer.printNode(ts.EmitHint.Unspecified, s, analyzer.sourceFile),
    );
    if (itBlock.trailingComments) {
      texts.push(itBlock.trailingComments);
    }
    itBlockTexts.push(texts);
  }

  // Step 6b: Validate forPublishing expressions against extended dead set (includes cascaded)
  for (const sub of substitutions) {
    const freeSymbols = resolveNamesToSymbols(analyzer, sub.freeVariables);
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
  // Collect all identifier names referenced in surviving body text for stale-import pruning.
  // Any external/localHelper import specifier whose local name does not appear in these texts
  // was eliminated by substitution and should be dropped from the output.
  const allBodyText = [
    ...survivingDescribeTexts,
    ...survivingVarTexts,
    ...itBlockTexts.flat(),
    ...beforeAllTexts,
    ...beforeEachTexts,
  ].join("\n");
  const referencedNames = new Set<string>(allBodyText.match(/\b[A-Za-z_$][A-Za-z0-9_$]*\b/g) ?? []);
  const { imports: rewrittenImports } = rewriteImports(
    filteredClassified,
    packageName,
    deadSymbols,
    analyzer,
    referencedNames,
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

  // Step 9: Assemble final output text (beforeAll preamble comes before beforeEach)
  const rawOutputText = assembleOutput(
    parsed.metadata,
    importTexts,
    survivingDescribeTexts,
    survivingVarTexts,
    functions,
    [...beforeAllTexts, ...beforeEachTexts],
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
  describeTexts: string[],
  describeVarTexts: string[],
  functions: Array<{ name: string; bodyTexts: string[] }>,
  mainPreambleTexts: string[],
  platform?: "node" | "browser",
): string {
  const lines: string[] = [];

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
  lines.push("");

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

    // Inline the single function's body
    for (const stmt of functions[0].bodyTexts) {
      for (const line of stmt.split("\n")) {
        lines.push("  " + line);
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
    for (const fn of functions) {
      lines.push(`  await ${fn.name}();`);
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
