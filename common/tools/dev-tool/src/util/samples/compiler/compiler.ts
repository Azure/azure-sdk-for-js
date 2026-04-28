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
import { substituteForPublishing } from "./substitutor.js";
import { eliminateDeadStatements } from "./deadBindingEliminator.js";
import { createAnalyzer, resolveNamesToSymbols, type BindingAnalyzer } from "./bindingAnalyzer.js";
import { descriptionToFunctionName } from "./codeGenerator.js";
import { rewriteImports } from "./importRewriter.js";
import { promoteLetToConst } from "./letConstPromoter.js";
import { compileHelper } from "./helperCompiler.js";
import { extractEnvVarNames } from "./envVarExtractor.js";
import { eliminateUnusedVariables } from "./unusedVarEliminator.js";
import type { HelperResolver } from "./helperCompiler.js";

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
}

/**
 * Compile a sample-test source file into publishable sample code.
 */
export function compileSampleTest(sourceText: string, options: CompileOptions): CompiledSample {
  const { packageName, fileName = "<sample-test>", resolveHelper, platform } = options;
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const sourceFile = createSourceFile(fileName, sourceText);
  const parsed = parseSampleTestFile(sourceFile, fileName);
  if (!parsed) {
    throw new CompilerError("No description found in file JSDoc comment", fileName);
  }

  // Browser samples require a bundler, so CommonJS JS output is not useful
  if (platform === "browser") {
    parsed.metadata.skipJavascript = true;
  }

  const { transformedFile, substitutions } = substituteForPublishing(sourceFile, fileName);
  const substitutedText = printer.printFile(transformedFile);

  const analyzer = createAnalyzer(substitutedText, fileName);
  const substitutedParsed = parseSampleTestFile(analyzer.sourceFile, fileName);
  if (!substitutedParsed) {
    throw new CompilerError("Internal error: re-parse failed after substitution", fileName);
  }

  const classified = classifyImports(analyzer.sourceFile);
  const deadSymbols = collectDeadSymbols(classified, analyzer);

  const helperFiles = new Map<string, string>();
  const helperEnvVars: string[] = [];
  const emptyHelperSpecifiers = new Set<string>();
  const warnings: string[] = [];
  if (parsed.warnings) warnings.push(...parsed.warnings);
  if (substitutedParsed.warnings) warnings.push(...substitutedParsed.warnings);

  const sampleDir = path.dirname(fileName);
  const storedHelperKeys = new Set<string>();
  function toRelativeHelperKey(canonicalPath: string): string {
    const rel = path.relative(sampleDir, canonicalPath).split(path.sep).join("/");
    return rel.startsWith(".") ? rel : "./" + rel;
  }

  if (resolveHelper) {
    const visitedPaths = new Set<string>();
    const helperCache = new Map<string, { helper: ReturnType<typeof compileHelper> }>();
    for (const classifiedImport of classified) {
      if (classifiedImport.category !== "localHelper") continue;

      const resolved = resolveHelper(fileName, classifiedImport.moduleSpecifier);
      if (!resolved) {
        warnings.push(
          `Could not resolve local helper "${classifiedImport.moduleSpecifier}" from "${fileName}"`,
        );
        continue;
      }

      let compiledHelper: ReturnType<typeof compileHelper>;
      const cached = helperCache.get(resolved.canonicalPath);
      if (cached) {
        compiledHelper = cached.helper;
      } else {
        visitedPaths.add(resolved.canonicalPath);

        compiledHelper = compileHelper(
          resolved.sourceText,
          packageName,
          resolved.canonicalPath,
          resolveHelper,
          visitedPaths,
        );
        helperCache.set(resolved.canonicalPath, { helper: compiledHelper });

        warnings.push(...compiledHelper.warnings);

        if (!compiledHelper.isEmpty) {
          const relativeKey = toRelativeHelperKey(resolved.canonicalPath);
          if (!storedHelperKeys.has(resolved.canonicalPath)) {
            storedHelperKeys.add(resolved.canonicalPath);
            helperFiles.set(relativeKey, compiledHelper.outputText);
            helperEnvVars.push(...compiledHelper.envVars);
          }

          for (const [nestedCanonicalPath, nestedHelper] of compiledHelper.nestedHelpers) {
            if (!nestedHelper.isEmpty && !storedHelperKeys.has(nestedCanonicalPath)) {
              storedHelperKeys.add(nestedCanonicalPath);
              helperFiles.set(toRelativeHelperKey(nestedCanonicalPath), nestedHelper.outputText);
              helperEnvVars.push(...nestedHelper.envVars);
            }
          }
        }
      }

      if (compiledHelper.isEmpty) {
        for (const symbol of analyzer.getImportBindingSymbols(classifiedImport.node)) {
          deadSymbols.add(symbol);
        }
        emptyHelperSpecifiers.add(classifiedImport.moduleSpecifier);
      }
    }
  }

  const filteredClassified =
    emptyHelperSpecifiers.size > 0
      ? classified.filter(
          (classifiedImport) => !emptyHelperSpecifiers.has(classifiedImport.moduleSpecifier),
        )
      : classified;

  validateNoDeadReferences(substitutions, deadSymbols, analyzer, fileName);

  const describeResult = eliminateDeadStatements(
    substitutedParsed.describeStatements,
    deadSymbols,
    analyzer,
    fileName,
  );
  const survivingDescribeTexts = describeResult.survivingStatements.map((stmt) =>
    printer.printNode(ts.EmitHint.Unspecified, stmt, analyzer.sourceFile),
  );
  const survivingVarTexts = describeResult.survivingStatements
    .filter(ts.isVariableStatement)
    .map((stmt) => printer.printNode(ts.EmitHint.Unspecified, stmt, analyzer.sourceFile));

  const beforeAllTexts: string[] = [];
  for (const hook of substitutedParsed.beforeAllHooks) {
    const hookResult = eliminateDeadStatements(
      hook.body,
      withCallbackParamDead(deadSymbols, hook.callbackParam, analyzer),
      analyzer,
      fileName,
    );
    for (const stmt of hookResult.survivingStatements) {
      beforeAllTexts.push(printer.printNode(ts.EmitHint.Unspecified, stmt, analyzer.sourceFile));
    }
    if (hook.trailingComments) {
      beforeAllTexts.push(hook.trailingComments);
    }
  }

  const beforeEachTexts: string[] = [];
  for (const hook of substitutedParsed.beforeEachHooks) {
    const hookResult = eliminateDeadStatements(
      hook.body,
      withCallbackParamDead(deadSymbols, hook.callbackParam, analyzer),
      analyzer,
      fileName,
    );
    for (const stmt of hookResult.survivingStatements) {
      beforeEachTexts.push(printer.printNode(ts.EmitHint.Unspecified, stmt, analyzer.sourceFile));
    }
    if (hook.trailingComments) {
      beforeEachTexts.push(hook.trailingComments);
    }
  }

  const itBlockTexts: string[][] = [];
  for (const itBlock of substitutedParsed.itBlocks) {
    const itResult = eliminateDeadStatements(
      itBlock.body,
      withCallbackParamDead(deadSymbols, itBlock.callbackParam, analyzer),
      analyzer,
      fileName,
    );
    const texts = itResult.survivingStatements.map((stmt) =>
      printer.printNode(ts.EmitHint.Unspecified, stmt, analyzer.sourceFile),
    );
    if (itBlock.trailingComments) {
      texts.push(itBlock.trailingComments);
    }
    itBlockTexts.push(texts);
  }

  validateNoDeadReferences(substitutions, deadSymbols, analyzer, fileName);

  const emptySourceFile = createSourceFile("output.ts", "");
  const allBodyText = [
    ...survivingDescribeTexts,
    ...survivingVarTexts,
    ...itBlockTexts.flat(),
    ...beforeAllTexts,
    ...beforeEachTexts,
  ].join("\n");
  // Fast heuristic to detect referenced identifiers — false positives are harmless
  const referencedNames = new Set<string>(allBodyText.match(/\b[A-Za-z_$][A-Za-z0-9_$]*\b/g) ?? []);
  const { imports: rewrittenImports } = rewriteImports(
    filteredClassified,
    packageName,
    deadSymbols,
    analyzer,
    referencedNames,
  );
  const importTexts = rewrittenImports.map((importNode) =>
    printer.printNode(ts.EmitHint.Unspecified, importNode, emptySourceFile),
  );

  const usedFunctionNames = new Set<string>();
  const sampleFunctions = substitutedParsed.itBlocks.map((itBlock, index) => {
    let functionName = descriptionToFunctionName(itBlock.description);
    if (usedFunctionNames.has(functionName)) {
      let suffix = 2;
      while (usedFunctionNames.has(`${functionName}${suffix}`)) suffix++;
      functionName = `${functionName}${suffix}`;
    }
    usedFunctionNames.add(functionName);
    return { name: functionName, bodyTexts: itBlockTexts[index] };
  });

  const rawOutputText = assembleOutput(
    parsed.metadata,
    importTexts,
    survivingDescribeTexts,
    survivingVarTexts,
    sampleFunctions,
    [...beforeAllTexts, ...beforeEachTexts],
  );

  const snippets = extractSnippets(rawOutputText, fileName);
  const envVars = [...extractEnvVarNames(rawOutputText), ...helperEnvVars];
  const uniqueEnvVars = [...new Set(envVars)].sort();
  const postProcessedText = postProcessOutput(rawOutputText);
  const outputText = eliminateUnusedVariables(postProcessedText, fileName);

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

function collectDeadSymbols(
  classifiedImports: ClassifiedImport[],
  analyzer: BindingAnalyzer,
): Set<ts.Symbol> {
  const deadSymbols = new Set<ts.Symbol>();
  for (const classifiedImport of classifiedImports) {
    if (classifiedImport.category !== "test") continue;
    for (const symbol of analyzer.getImportBindingSymbols(classifiedImport.node)) {
      deadSymbols.add(symbol);
    }
  }
  return deadSymbols;
}

function withCallbackParamDead(
  deadSymbols: Set<ts.Symbol>,
  callbackParam: ts.Identifier | undefined,
  analyzer: BindingAnalyzer,
): Set<ts.Symbol> {
  if (!callbackParam) return deadSymbols;
  const paramSymbol = analyzer.getSymbol(callbackParam);
  if (!paramSymbol) return deadSymbols;
  const extendedDeadSymbols = new Set(deadSymbols);
  extendedDeadSymbols.add(paramSymbol);
  return extendedDeadSymbols;
}

function validateNoDeadReferences(
  substitutions: Array<{ freeVariables: string[] }>,
  deadSymbols: Set<ts.Symbol>,
  analyzer: BindingAnalyzer,
  fileName: string,
): void {
  for (const substitution of substitutions) {
    const freeSymbols = resolveNamesToSymbols(analyzer, substitution.freeVariables);
    for (const symbol of freeSymbols) {
      if (deadSymbols.has(symbol)) {
        throw new CompilerError(
          `Symbol "${symbol.name}" in forPublishing expression is not available after cleanup (it was removed as test infrastructure)`,
          fileName,
        );
      }
    }
  }
}

function assembleOutput(
  metadata: SampleMetadata,
  importTexts: string[],
  describeScopeTexts: string[],
  describeScopeVarTexts: string[],
  sampleFunctions: Array<{ name: string; bodyTexts: string[] }>,
  mainPreambleTexts: string[],
): string {
  const outputLines: string[] = [];

  outputLines.push("// Copyright (c) Microsoft Corporation.");
  outputLines.push("// Licensed under the MIT License.");
  outputLines.push("");

  outputLines.push("/**");
  outputLines.push(` * @summary ${metadata.summary}`);
  if (metadata.weight !== undefined) {
    outputLines.push(` * @azsdk-weight ${metadata.weight}`);
  }
  if (metadata.skipJavascript) {
    outputLines.push(` * @azsdk-skip-javascript`);
  }
  if (metadata.ignore) {
    outputLines.push(` * @azsdk-ignore`);
  }
  outputLines.push(" */");
  outputLines.push("");

  for (const importText of importTexts) {
    outputLines.push(importText);
  }
  outputLines.push("");

  if (sampleFunctions.length === 1) {
    const { remainingVars, statements: promotedPreamble } = promoteLetToConst(
      describeScopeVarTexts,
      mainPreambleTexts,
      sampleFunctions[0].bodyTexts,
    );

    const remainingVarSet = new Set(remainingVars);
    const promotedVarSet = new Set(
      describeScopeVarTexts.filter((varText) => !remainingVarSet.has(varText)),
    );

    outputLines.push("export async function main(): Promise<void> {");

    for (const scopeText of describeScopeTexts) {
      if (promotedVarSet.has(scopeText)) continue;
      for (const line of scopeText.split("\n")) {
        outputLines.push("  " + line);
      }
    }

    for (const preambleStmt of promotedPreamble) {
      for (const line of preambleStmt.split("\n")) {
        outputLines.push("  " + line);
      }
    }

    for (const bodyStmt of sampleFunctions[0].bodyTexts) {
      for (const line of bodyStmt.split("\n")) {
        outputLines.push("  " + line);
      }
    }

    outputLines.push("}");
    outputLines.push("");
  } else {
    if (describeScopeTexts.length > 0) {
      for (const scopeText of describeScopeTexts) {
        outputLines.push(scopeText);
      }
      outputLines.push("");
    }

    for (const sampleFunc of sampleFunctions) {
      outputLines.push(`async function ${sampleFunc.name}() {`);
      for (const bodyStmt of sampleFunc.bodyTexts) {
        for (const line of bodyStmt.split("\n")) {
          outputLines.push("  " + line);
        }
      }
      outputLines.push("}");
      outputLines.push("");
    }

    outputLines.push("export async function main(): Promise<void> {");
    for (const preambleStmt of mainPreambleTexts) {
      for (const line of preambleStmt.split("\n")) {
        outputLines.push("  " + line);
      }
    }
    for (const sampleFunc of sampleFunctions) {
      outputLines.push(`  await ${sampleFunc.name}();`);
    }
    outputLines.push("}");
    outputLines.push("");
  }

  outputLines.push("main().catch((error) => {");
  outputLines.push("  console.error(error);");
  outputLines.push("  process.exit(1);");
  outputLines.push("});");
  outputLines.push("");

  return outputLines.join("\n");
}

function postProcessOutput(text: string): string {
  let result = text.replace(/^[ \t]*\/\/\s*@ts-preserve-whitespace\s*$/gm, "");
  result = result.replace(/^[ \t]*\/\/\s*@snippet(?:-end)?\s+\S+.*$/gm, "");
  result = result.replace(/\n{3,}/g, "\n\n");
  return result;
}

function extractSnippets(sourceText: string, fileName?: string): Map<string, string> {
  const snippets = new Map<string, string>();
  const sourceLines = sourceText.split("\n");
  let currentSnippet: { name: string; contentLines: string[]; startLine: number } | null = null;
  const snippetStartPattern = /\/\/\s*@snippet\s+(\S+)/;
  const snippetEndPattern = /\/\/\s*@snippet-end\s+(\S+)/;

  for (let lineIndex = 0; lineIndex < sourceLines.length; lineIndex++) {
    const line = sourceLines[lineIndex];
    const startMatch = line.match(snippetStartPattern);
    const endMatch = line.match(snippetEndPattern);

    if (endMatch && currentSnippet && endMatch[1] === currentSnippet.name) {
      snippets.set(currentSnippet.name, currentSnippet.contentLines.join("\n"));
      currentSnippet = null;
    } else if (startMatch && !endMatch) {
      if (currentSnippet) {
        throw new CompilerError(
          `Nested snippet marker "@snippet ${startMatch[1]}" found inside "@snippet ${currentSnippet.name}" (opened at line ${currentSnippet.startLine})`,
          fileName ?? "<unknown>",
          lineIndex + 1,
        );
      }
      currentSnippet = { name: startMatch[1], contentLines: [], startLine: lineIndex + 1 };
    } else if (currentSnippet) {
      currentSnippet.contentLines.push(line);
    }
  }

  if (currentSnippet) {
    throw new CompilerError(
      `Unclosed snippet marker "@snippet ${currentSnippet.name}" (opened at line ${currentSnippet.startLine})`,
      fileName ?? "<unknown>",
      currentSnippet.startLine,
    );
  }

  return snippets;
}
