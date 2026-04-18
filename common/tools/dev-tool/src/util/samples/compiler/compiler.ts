// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Integration module for the sample-tests compiler.
 *
 * Orchestrates the full pipeline: parse → substitute → classify → eliminate → generate → assemble.
 * Transforms a vitest-based sample-test file into publishable sample code.
 */

import ts from "typescript";
import type { CompiledSample, ClassifiedImport, SampleMetadata } from "./types.js";
import { CompilerError } from "./types.js";
import { parseSampleTestFile } from "./parser.js";
import { classifyImports } from "./importClassifier.js";
import { substituteForPublishing } from "./substitutor.js";
import { eliminateDeadBindings } from "./deadBindingEliminator.js";
import { descriptionToFunctionName } from "./codeGenerator.js";
import { rewriteImports } from "./importRewriter.js";
import { promoteLetToConst } from "./letConstPromoter.js";
import { compileHelper } from "./helperCompiler.js";
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
}

/**
 * Compile a sample-test source file into publishable sample code.
 */
export function compileSampleTest(
  sourceText: string,
  options: CompileOptions,
): CompiledSample {
  const { packageName, fileName = "<sample-test>", resolveHelper } = options;
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // Step 1: Parse source text into AST
  const sourceFile = createSourceFile(fileName, sourceText);

  // Step 2: Parse structure for metadata and describe/it layout
  const parsed = parseSampleTestFile(sourceFile, fileName);
  if (!parsed) {
    throw new CompilerError("No @summary tag found in file", fileName);
  }

  // Step 3: Substitute forPublishing calls across the entire source
  const { transformedFile, substitutions } = substituteForPublishing(sourceFile, fileName);

  // Step 4: Print and re-parse to get a clean AST with substitutions applied
  const substitutedText = printer.printFile(transformedFile);
  const subFile = createSourceFile(fileName, substitutedText);
  const subParsed = parseSampleTestFile(subFile, fileName);
  if (!subParsed) {
    throw new CompilerError("Internal error: re-parse failed after substitution", fileName);
  }

  // Step 5: Classify imports and collect dead binding names from test imports
  const classified = classifyImports(subFile);
  const deadBindings = collectDeadBindings(classified);

  // Step 5a: Resolve local helper imports (import graph following)
  const helperFiles = new Map<string, string>();
  const helperEnvVars: string[] = [];
  const emptyHelperSpecifiers = new Set<string>();
  const warnings: string[] = [];

  if (resolveHelper) {
    const visited = new Set<string>();
    for (const ci of classified) {
      if (ci.category !== "localHelper") continue;

      const resolved = resolveHelper(fileName, ci.moduleSpecifier);
      if (!resolved) {
        warnings.push(
          `Could not resolve local helper "${ci.moduleSpecifier}" from "${fileName}"`,
        );
        continue;
      }

      if (visited.has(resolved.canonicalPath)) continue;
      visited.add(resolved.canonicalPath);

      const helper = compileHelper(
        resolved.sourceText,
        packageName,
        resolved.canonicalPath,
        resolveHelper,
        visited,
      );

      if (helper.isEmpty) {
        // Pure test helper: mark all imported bindings as dead
        const clause = ci.node.importClause;
        if (clause) {
          if (clause.name) deadBindings.add(clause.name.text);
          if (clause.namedBindings) {
            if (ts.isNamedImports(clause.namedBindings)) {
              for (const spec of clause.namedBindings.elements) {
                deadBindings.add(spec.name.text);
              }
            } else if (ts.isNamespaceImport(clause.namedBindings)) {
              deadBindings.add(clause.namedBindings.name.text);
            }
          }
        }
        emptyHelperSpecifiers.add(ci.moduleSpecifier);
      } else {
        // Helper has survivors: keep import, store compiled output
        helperFiles.set(ci.moduleSpecifier, helper.outputText);
        helperEnvVars.push(...helper.envVars);

        // Collect transitive nested helper files (already flattened by compileHelper)
        for (const [nestedSpec, nestedHelper] of helper.nestedHelpers) {
          if (!nestedHelper.isEmpty && !helperFiles.has(nestedSpec)) {
            helperFiles.set(nestedSpec, nestedHelper.outputText);
            helperEnvVars.push(...nestedHelper.envVars);
          }
        }
      }
    }
  }

  // Filter out empty helper imports before further processing
  const filteredClassified = emptyHelperSpecifiers.size > 0
    ? classified.filter((ci) => !emptyHelperSpecifiers.has(ci.moduleSpecifier))
    : classified;

  // Step 5b: Validate that forPublishing expressions don't reference dead bindings
  for (const sub of substitutions) {
    for (const name of sub.freeVariables) {
      if (deadBindings.has(name)) {
        throw new CompilerError(
          `Symbol "${name}" in forPublishing expression is not available after cleanup (it was removed as test infrastructure)`,
          fileName,
        );
      }
    }
  }

  // Step 6: Clean scopes with cascading dead set
  // Describe variables first — cascade feeds other scopes
  const extendedDead = new Set(deadBindings);

  const { surviving: varTexts, eliminated: varEliminated } = cleanScope(
    subParsed.describeVariables,
    subFile,
    extendedDead,
    printer,
    fileName,
  );
  for (const name of varEliminated) extendedDead.add(name);

  // beforeEach hooks — surviving statements become main() preamble
  const beforeEachTexts: string[] = [];
  for (const hook of subParsed.beforeEachHooks) {
    const { surviving, eliminated } = cleanScope(
      hook.body,
      subFile,
      extendedDead,
      printer,
      fileName,
    );
    beforeEachTexts.push(...surviving);
    for (const name of eliminated) extendedDead.add(name);
  }

  // it block bodies
  const itBlockTexts: string[][] = [];
  for (const itBlock of subParsed.itBlocks) {
    const { surviving } = cleanScope(itBlock.body, subFile, extendedDead, printer, fileName);
    itBlockTexts.push(surviving);
  }

  // Step 6b: Validate forPublishing expressions against extended dead set (includes cascaded)
  for (const sub of substitutions) {
    for (const name of sub.freeVariables) {
      if (extendedDead.has(name)) {
        throw new CompilerError(
          `Symbol "${name}" in forPublishing expression is not available after cleanup (it was removed as test infrastructure)`,
          fileName,
        );
      }
    }
  }

  // Step 7: Rewrite imports
  const dummyFile = createSourceFile("output.ts", "");
  const { imports: rewrittenImports } = rewriteImports(filteredClassified, packageName, extendedDead, subFile);
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

  // Step 9: Assemble final output text
  const rawOutputText = assembleOutput(
    parsed.metadata,
    importTexts,
    varTexts,
    functions,
    beforeEachTexts,
  );

  // Step 10: Extract snippets and environment variables (before stripping markers)
  const snippets = extractSnippets(rawOutputText);
  const envVars = [...extractEnvVars(rawOutputText), ...helperEnvVars];
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
 * Collect all binding names introduced by test-category imports.
 */
function collectDeadBindings(classified: ClassifiedImport[]): Set<string> {
  const dead = new Set<string>();
  for (const ci of classified) {
    if (ci.category !== "test") continue;
    const clause = ci.node.importClause;
    if (!clause) continue;
    if (clause.name) dead.add(clause.name.text);
    if (clause.namedBindings) {
      if (ts.isNamedImports(clause.namedBindings)) {
        for (const spec of clause.namedBindings.elements) {
          dead.add(spec.name.text);
        }
      } else if (ts.isNamespaceImport(clause.namedBindings)) {
        dead.add(clause.namedBindings.name.text);
      }
    }
  }
  return dead;
}

/**
 * Create a mini source file from the given statements, run dead-binding
 * elimination, and return the surviving statement texts.
 *
 * This approach preserves comments (including snippet markers) because each
 * statement is printed from its own source file where trivia is consistent.
 */
function cleanScope(
  stmts: readonly ts.Statement[],
  srcFile: ts.SourceFile,
  dead: Set<string>,
  printer: ts.Printer,
  fileName: string,
): { surviving: string[]; eliminated: Set<string> } {
  if (stmts.length === 0) return { surviving: [], eliminated: new Set() };

  // Print statements from the substituted file (trivia is correct here)
  const texts = stmts.map((s) => printer.printNode(ts.EmitHint.Unspecified, s, srcFile));
  const miniText = texts.join("\n");
  const miniFile = createSourceFile("mini.ts", miniText);

  const result = eliminateDeadBindings(miniFile, dead, fileName);

  // Print survivors from the mini file (trivia is consistent)
  const survivingTexts = [...result.outputFile.statements].map((s) =>
    printer.printNode(ts.EmitHint.Unspecified, s, result.outputFile),
  );

  return { surviving: survivingTexts, eliminated: result.eliminatedBindings };
}

/**
 * Assemble the final output text from its constituent pieces.
 */
function assembleOutput(
  metadata: SampleMetadata,
  importTexts: string[],
  varTexts: string[],
  functions: Array<{ name: string; bodyTexts: string[] }>,
  mainPreambleTexts: string[],
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
    const { promotedConsts, remainingVars, remainingPreamble } = promoteLetToConst(
      varTexts,
      mainPreambleTexts,
    );

    lines.push("export async function main(): Promise<void> {");

    // Promoted const declarations first
    for (const c of promotedConsts) {
      for (const line of c.split("\n")) {
        lines.push("  " + line);
      }
    }

    // Remaining vars that couldn't be promoted
    for (const v of remainingVars) {
      for (const line of v.split("\n")) {
        lines.push("  " + line);
      }
    }

    // Remaining preamble statements
    for (const stmt of remainingPreamble) {
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
    // Multi-it: module-level vars + named functions + main() calling them
    if (varTexts.length > 0) {
      for (const v of varTexts) {
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

  // catch handler
  lines.push("main().catch((error) => {");
  lines.push("  console.error(error);");
  lines.push("  process.exit(1);");
  lines.push("});");
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

  // Collapse runs of 3+ blank lines down to 2
  result = result.replace(/\n{3,}/g, "\n\n");

  return result;
}

/**
 * Extract snippet regions delimited by `// @snippet Name` and `// @snippet-end Name`.
 */
function extractSnippets(text: string): Map<string, string> {
  const snippets = new Map<string, string>();
  const lines = text.split("\n");
  let current: { name: string; lines: string[] } | null = null;
  const startRegex = /\/\/\s*@snippet\s+(\S+)/;
  const endRegex = /\/\/\s*@snippet-end\s+(\S+)/;

  for (const line of lines) {
    const startMatch = line.match(startRegex);
    const endMatch = line.match(endRegex);

    if (endMatch && current && endMatch[1] === current.name) {
      snippets.set(current.name, current.lines.join("\n"));
      current = null;
    } else if (startMatch && !endMatch && !current) {
      current = { name: startMatch[1], lines: [] };
    } else if (current) {
      current.lines.push(line);
    }
  }

  return snippets;
}

/**
 * Extract environment variable names from `process.env.X` and `process.env["X"]` patterns.
 */
function extractEnvVars(text: string): string[] {
  const vars = new Set<string>();

  // process.env.VARIABLE_NAME
  for (const match of text.matchAll(/process\.env\.([A-Za-z_][A-Za-z0-9_]*)/g)) {
    vars.add(match[1]);
  }

  // process.env["VARIABLE_NAME"]
  for (const match of text.matchAll(/process\.env\["([A-Za-z_][A-Za-z0-9_]*)"\]/g)) {
    vars.add(match[1]);
  }

  // process.env['VARIABLE_NAME']
  for (const match of text.matchAll(/process\.env\['([A-Za-z_][A-Za-z0-9_]*)'\]/g)) {
    vars.add(match[1]);
  }

  return [...vars].sort();
}
