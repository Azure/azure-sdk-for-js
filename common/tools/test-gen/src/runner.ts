// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * runner.ts
 *
 * Coverage-specific implementation that targets one file per iteration.
 */

import { exec } from "node:child_process";
import { promisify } from "node:util";
import { resolve, join, dirname } from "node:path";
import { writeFile, readFile, readdir, mkdir } from "node:fs/promises";
import { extractGaps, computeBranchCoverage, filterGapsForFile } from "./extract-gaps.ts";
import type { ExtractGapsResult } from "./extract-gaps.ts";
import type { CoverageGap } from "./types.ts";
import { buildPrompt } from "./build-prompt.ts";
import { extractTestMap } from "./extract-test-map.ts";
import { resolveContext } from "./resolve-context.ts";
import type { ContextFile } from "./resolve-context.ts";
import { stopClient, send } from "./llm.ts";
import type { SendOptions } from "./llm.ts";
import { tryReadFile } from "./utils.ts";
import { resolveConfig, codeFenceFor } from "./config.ts";
import type { Config } from "./config.ts";
import { loop } from "./loop/index.ts";
import { annotateSource, commentPrefixFor, mergeAdjacentGaps } from "./annotate-source.ts";
import type { RunReport, LlmCallStats } from "./types.ts";
import { z } from "zod";

const execAsync = promisify(exec);

const MergeResponse = z.object({
  code: z.string().describe("The merged test file content"),
});

const FixResponse = z.object({
  code: z.string().describe("The corrected test file content"),
});

const IsolationFixResponse = z.object({
  files: z
    .array(
      z.object({
        path: z.string().describe("Relative path of the file that was modified"),
        code: z.string().describe("Complete corrected file content"),
      }),
    )
    .describe("Only files that were changed — omit files that are fine as-is"),
  fixes: z
    .array(
      z.object({
        file: z.string().describe("Which generated file was fixed"),
        test_name: z.string().describe("Test function that was fixed or removed"),
        error_type: z.string().describe("Type of isolation issue"),
        fix: z.string().describe("What was changed and why"),
      }),
    )
    .describe("Explanation of each fix applied"),
});

// ── Helpers ──

interface TestResult {
  passed: boolean;
  output: string;
}

/**
 * Run a single test file and return pass/fail + captured output.
 * Uses `cfg.runner.runSingle` with `$FILE` replaced by the test path.
 */
async function runSingleTest(
  relPath: string,
  packageDir: string,
  cfg: Config,
): Promise<TestResult> {
  const command = cfg.runner.runSingle.replace("$FILE", relPath);
  try {
    const { stdout } = await execAsync(`${command} 2>&1`, {
      cwd: packageDir,
      timeout: cfg.runner.timeout,
      maxBuffer: cfg.runner.maxBuffer,
    });
    return { passed: true, output: tail(stdout, cfg.runner.tailLines) };
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message?: string };
    const output = err.stdout ?? err.stderr ?? err.message ?? "Unknown error";
    return { passed: false, output: tail(output, cfg.runner.tailLines) };
  }
}

function tail(text: string, lines: number): string {
  let count = 0;
  let i = text.length;
  while (i > 0 && count < lines) {
    i = text.lastIndexOf("\n", i - 1);
    if (i === -1) {
      i = 0;
      break;
    }
    count++;
  }
  return i === 0 ? text : text.slice(i + 1);
}

/**
 * Run async tasks with limited concurrency (sliding window).
 * Each task returns a number (batch count) and results are summed.
 */
async function runParallel(
  tasks: Array<() => Promise<number>>,
  concurrency: number,
  signal?: AbortSignal,
): Promise<number> {
  let total = 0;
  const executing = new Set<Promise<void>>();
  for (const task of tasks) {
    if (signal?.aborted) break;
    const p = task().then((n) => {
      total += n;
      executing.delete(p);
    });
    executing.add(p);
    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }
  await Promise.all(executing);
  return total;
}

/**
 * Run the full test suite command and return pass/fail + output.
 * Unlike `runTests()` which logs and continues, this captures the result.
 */
async function runFullSuite(command: string, packageDir: string, cfg: Config): Promise<TestResult> {
  try {
    const { stdout } = await execAsync(`${command} 2>&1`, {
      cwd: packageDir,
      timeout: cfg.runner.timeout,
      maxBuffer: cfg.runner.maxBuffer,
    });
    return { passed: true, output: tail(stdout, cfg.runner.tailLines) };
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message?: string };
    const output = err.stdout ?? err.stderr ?? err.message ?? "Unknown error";
    return { passed: false, output: tail(output, cfg.runner.tailLines) };
  }
}

/**
 * If the target file already exists, ask the LLM to merge new tests into it.
 * Returns the final code to write (merged or original if file is new).
 */
async function mergeIfExists(
  packageDir: string,
  relPath: string,
  newCode: string,
  cfg: Config,
  llmStats: LlmCallStats[],
  signal?: AbortSignal,
): Promise<string> {
  const absPath = resolve(packageDir, relPath);
  const existing = await tryReadFile(absPath);
  if (!existing) return newCode;

  const { testFramework } = cfg.language;
  const codeFence = codeFenceFor(cfg.language.outputExtension);
  const mergeSchema = JSON.stringify(MergeResponse.toJSONSchema(), null, 2);
  const prompt = `You are merging new ${testFramework} tests into an existing test file.

## Existing File (\`${relPath}\`)

\`\`\`${codeFence}
${existing}
\`\`\`

## New Tests to Add

\`\`\`${codeFence}
${newCode}
\`\`\`

## Instructions

1. Merge the new tests into the existing file.
2. Do NOT duplicate any existing describe/it blocks.
3. **NEVER delete, skip, or modify existing tests.** Every existing describe/it block must appear in the output UNCHANGED.
4. Preserve all existing imports, helpers, setup/teardown hooks, and structure verbatim.
5. Add any new imports needed by the new tests.
6. Return the complete merged file — existing tests first, then new tests appended.

Respond with ONLY valid JSON matching this schema — no markdown fences, no explanation, just the raw JSON object:
${mergeSchema}`;

  const { content, inputTokens, outputTokens, durationMs } = await send(prompt, {
    model: cfg.llm.fixModel ?? cfg.llm.model,
    signal,
  });
  llmStats.push({ inputTokens, outputTokens, durationMs });
  const result = MergeResponse.parse(JSON.parse(content));
  return result.code;
}

/**
 * Write a test file then loop: run tests → if fail, ask LLM to fix → repeat
 * until tests pass or fixMaxIterations is exhausted.
 */
async function writeAndFix(
  packageDir: string,
  relPath: string,
  code: string,
  cfg: Config,
  log: (msg: string) => void,
  llmStats: LlmCallStats[],
  signal?: AbortSignal,
  /** Relative path to the source file under test (the gap file). */
  sourceFile?: string,
): Promise<void> {
  const absPath = resolve(packageDir, relPath);
  await mkdir(dirname(absPath), { recursive: true });
  await writeFile(absPath, code, "utf8");

  const maxFix = cfg.loop.fixMaxIterations;
  if (maxFix <= 0) return;

  const codeFence = codeFenceFor(cfg.language.outputExtension);
  const fixSchema = JSON.stringify(FixResponse.toJSONSchema(), null, 2);

  // Read the source file under test so the LLM can reference actual types/signatures.
  const sourceCode = sourceFile ? await tryReadFile(resolve(packageDir, sourceFile)) : undefined;
  const sourceSection = sourceCode
    ? `\n## Source Under Test\n\n**\`${sourceFile}\`**\n\n\`\`\`${codeFence}\n${sourceCode}\n\`\`\`\n`
    : "";

  interface FixContext {
    currentCode: string;
    errors: string;
  }

  const ctx: FixContext = { currentCode: code, errors: "" };

  await loop<FixContext>(
    {
      async isTerminal(ctx) {
        const result = await runSingleTest(relPath, packageDir, cfg);
        if (result.passed) {
          log("    ✅ Tests pass");
          return true;
        }
        ctx.errors = result.output;
        log("    ⚠️  Tests failed — asking LLM to fix");
        return false;
      },

      async act(ctx) {
        const prompt = `A generated test file has failures. Fix the failing tests.

## Test File

**\`${relPath}\`**

\`\`\`${codeFence}
${ctx.currentCode}
\`\`\`
${sourceSection}
## Test Output (errors)

\`\`\`
${ctx.errors}
\`\`\`

## Diagnosis Instructions

Before fixing, analyze each failure:

1. **Read the error message.** Is it an ImportError, AttributeError, AssertionError, TypeError, or something else?
2. **Trace to root cause:**
   - ImportError → wrong module path or non-existent symbol. Check the source file for the correct import.
   - AttributeError → wrong attribute/method name. Check the source file for the actual API.
   - AssertionError → wrong expected value. Re-read the source logic and correct the assertion.
   - TypeError → wrong argument count or type. Check the function signature in the source.
   - Other → examine the traceback and fix accordingly.
3. **Apply the minimal fix.** Change ONLY what's needed to make the test pass while still testing the intended branch.

## Rules

1. Fix ONLY the failing tests. Do NOT modify passing tests.
2. NEVER delete or skip a test — every test in the input must appear in the output.
3. Preserve all imports, helpers, and structure not related to the failure.
4. If a test's assertion was wrong, fix the expected value — do NOT weaken the assertion.
5. If an import is wrong, fix it using the actual symbols visible in the source file.
6. Return the COMPLETE corrected file — not a diff, not a partial snippet.

Respond with ONLY valid JSON matching this schema — no markdown fences, no explanation, just the raw JSON object:
${fixSchema}`;

        const { content, inputTokens, outputTokens, durationMs } = await send(prompt, {
          model: cfg.llm.fixModel ?? cfg.llm.model,
          signal,
        });
        llmStats.push({ inputTokens, outputTokens, durationMs });
        const result = FixResponse.parse(JSON.parse(content));
        ctx.currentCode = result.code;
        await writeFile(absPath, ctx.currentCode, "utf8");
      },
    },
    ctx,
    maxFix,
    signal,
  );
}

/**
 * Fix loop for isolation issues: the test file passes alone but breaks other
 * tests when run together. Runs the full suite to verify after each fix attempt.
 */
async function isolationFixLoop(
  packageDir: string,
  generatedFiles: string[],
  cfg: Config,
  log: (msg: string) => void,
  llmStats: LlmCallStats[],
  suiteErrors: string,
  signal?: AbortSignal,
): Promise<void> {
  const codeFence = codeFenceFor(cfg.language.outputExtension);
  const fixSchema = JSON.stringify(IsolationFixResponse.toJSONSchema(), null, 2);
  const maxFix = cfg.loop.fixMaxIterations;

  interface IsoFixContext {
    fileCodes: Map<string, string>;
    errors: string;
  }

  // Read all generated files
  const fileCodes = new Map<string, string>();
  for (const relPath of generatedFiles) {
    try {
      fileCodes.set(relPath, await readFile(resolve(packageDir, relPath), "utf8"));
    } catch {
      log(`    ⚠️  Could not read ${relPath}, skipping`);
    }
  }
  if (fileCodes.size === 0) return;

  const ctx: IsoFixContext = { fileCodes, errors: suiteErrors };

  await loop<IsoFixContext>(
    {
      async isTerminal(ctx) {
        const result = await runFullSuite(cfg.runner.command, packageDir, cfg);
        if (result.passed) {
          log("    ✅ Full suite passes");
          return true;
        }
        ctx.errors = result.output;
        log("    ⚠️  Full suite still failing — asking LLM to fix isolation issues");
        return false;
      },

      async act(ctx) {
        const filesSection = Array.from(ctx.fileCodes.entries())
          .map(
            ([path, code]) =>
              `### \`${path}\`\n\n\`\`\`${codeFence}\n${code}\n\`\`\``,
          )
          .join("\n\n");

        const prompt = `Some generated test files pass when run individually but cause OTHER tests to fail
when run as part of the full test suite. This is a test isolation problem — one or more
of the generated files are leaking global state that corrupts the test environment.

## Generated Test Files (${ctx.fileCodes.size} files)

${filesSection}

## Full Suite Errors

These failures appear when the generated test files above are included in the suite:

\`\`\`
${ctx.errors}
\`\`\`

## Diagnosis Instructions

1. **Read the error tracebacks** to identify which generated test(s) are causing the pollution.
   Look for: module reloading, monkey-patching, global state mutation, singleton modification.
2. **Cross-reference** the errors with the generated test files. The culprit file(s) will
   contain code that mutates shared state without cleanup.
3. **Fix ONLY the files that cause isolation problems.** Most files are likely fine — return
   only the ones you changed.
4. For each fix, prefer rewriting to use local mocks or isolated approaches over removing tests.
5. If a branch is untestable without global mutation, remove the test and add a comment.

## Rules

1. Return ONLY files you changed — do NOT include files that are fine as-is.
2. Each returned file must contain the COMPLETE corrected content.
3. Prefer rewriting over removing. Only remove a test if there is no safe alternative.
4. Removed tests should be kept as commented-out blocks with explanation.
5. Do NOT modify any tests that are working correctly.

Respond with ONLY valid JSON matching this schema — no markdown fences, no explanation:
${fixSchema}`;

        const { content, inputTokens, outputTokens, durationMs } = await send(prompt, {
          model: cfg.llm.fixModel ?? cfg.llm.model,
          signal,
        });
        llmStats.push({ inputTokens, outputTokens, durationMs });
        const result = IsolationFixResponse.parse(JSON.parse(content));

        // Write only the files the LLM changed
        for (const file of result.files) {
          const absPath = resolve(packageDir, file.path);
          await writeFile(absPath, file.code, "utf8");
          ctx.fileCodes.set(file.path, file.code);
          log(`    📝 Fixed: ${file.path}`);
        }
        for (const fix of result.fixes) {
          log(`    🔧 ${fix.file}: ${fix.test_name} — ${fix.fix}`);
        }
      },
    },
    ctx,
    maxFix,
    signal,
  );
}

export interface RunOptions {
  packageDir: string;
  dryRun?: boolean;
  onProgress?: (msg: string) => void;
  signal?: AbortSignal;
  /** Partial config overrides — merged over defaults. */
  config?: Partial<{ [K in keyof Config]: Partial<Config[K]> }>;
}

/** Response schema for single-pass mode (includes analysis array). */

async function runTests(
  command: string,
  packageDir: string,
  log: (msg: string) => void,
  cfg: Config,
): Promise<void> {
  log(`\n▶ Running: ${command}`);
  try {
    const { stdout } = await execAsync(`${command} 2>&1`, {
      cwd: packageDir,
      timeout: cfg.runner.timeout,
      maxBuffer: cfg.runner.maxBuffer,
    });
    log(tail(stdout, cfg.runner.tailLines));
  } catch (e) {
    const err = e as { stdout?: string };
    if (err.stdout) {
      log(tail(err.stdout, cfg.runner.tailLines));
    }
    log("⚠️  Some tests may have failed. Checking coverage anyway...");
  }
}

function scanTestDir(
  entries: string[],
  cfg: Config,
): {
  folderTree: string;
  specFiles: (testDir: string) => string[];
} {
  const { paths } = cfg;
  const folderTree =
    entries.length > 0
      ? entries.map((e) => `${paths.testDir}/${e}`).join("\n")
      : `${paths.testDir}/ (empty or does not exist)`;

  const specFiles = (testDir: string) =>
    entries
      .filter(
        (e) => e.endsWith(paths.specSuffix) && !paths.specExclusions.some((ex) => e.includes(ex)),
      )
      .map((e) => join(testDir, e));

  return { folderTree, specFiles };
}

async function readTestEntries(testDir: string, cfg: Config): Promise<string[]> {
  try {
    return (await readdir(testDir, { recursive: true }))
      .filter((e) => cfg.paths.testExtensions.some((ext) => e.endsWith(ext)))
      .sort();
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw e;
  }
}

/** Response schema for single-pass mode (includes analysis array). */
const SinglePassResponse = z.object({
  path: z.string(),
  code: z.string(),
  analysis: z
    .array(
      z.object({
        marker_line: z.number(),
        branch_condition: z.string(),
        test_function: z.string(),
        trigger_strategy: z.string(),
      }),
    )
    .optional(),
});

/**
 * Single-pass test generation: measure once → resolve context → batch generate → fix → verify.
 *
 * Measures coverage exactly once, then generates tests for all gap files in
 * branch-level batches. Each batch targets N uncovered branches and produces
 * a focused test file. All batches for the same source module merge into one
 * output file (e.g., `test_init_gaps.py`).
 */
export async function runSinglePass(options: RunOptions): Promise<RunReport> {
  const wallStart = Date.now();
  const cfg = resolveConfig(options.config);
  const { packageDir, dryRun = false } = options;
  const log = options.onProgress ?? console.log;
  const llmStats: LlmCallStats[] = [];
  const generatedFiles: string[] = [];

  log("╔══════════════════════════════════════════════════════════════╗");
  log("║  Single-Pass Test Generation                                ║");
  log("╠══════════════════════════════════════════════════════════════╣");
  log(`║  Model:      ${cfg.llm.model}`);
  if (cfg.llm.fixModel) log(`║  Fix model:  ${cfg.llm.fixModel}`);
  log(`║  Batch size: ${cfg.loop.gapBatchSize} branches per LLM call`);
  log(`║  Max files:  ${cfg.loop.maxGapFiles}`);
  log(`║  Fix iter:   ${cfg.loop.fixMaxIterations} per file`);
  if (cfg.loop.concurrency > 1) log(`║  Parallel:   ${cfg.loop.concurrency} source files`);
  if (dryRun) log("║  Mode:       dry-run (print only, no writes)");
  log("╚══════════════════════════════════════════════════════════════╝");

  // ── Step 1: Measure coverage ──
  log("\n━━━ Step 1: Measuring coverage ━━━");
  await runTests(cfg.runner.command, packageDir, log, cfg);

  let gapsResult: ExtractGapsResult;
  try {
    gapsResult = await extractGaps(packageDir, {
      coveragePath: cfg.runner.coveragePath,
      sourcePrefix: cfg.paths.sourcePrefix,
      sourceExclusions: cfg.paths.sourceExclusions,
      coverageFormat: cfg.runner.coverageFormat,
    });
  } catch {
    log(`\n❌ ${cfg.runner.coveragePath} not generated.`);
    await stopClient();
    return buildReport(0, 0, [], llmStats, wallStart, 0);
  }

  const initialBranchCov = computeBranchCoverage(gapsResult.fileStats);
  log(`\n📊 Initial branch coverage: ${initialBranchCov.toFixed(1)}%`);

  // ── Step 2: Rank gap files ──
  const ranked = Object.entries(gapsResult.fileStats)
    .filter(([, s]) => s.gapCount > 0)
    .sort(([, a], [, b]) => b.gapCount - a.gapCount)
    .slice(0, cfg.loop.maxGapFiles);

  if (ranked.length === 0) {
    log("\n✅ No coverage gaps found!");
    await stopClient();
    return buildReport(initialBranchCov, initialBranchCov, [], llmStats, wallStart, 0);
  }

  log(`\n📦 ${ranked.length} source files with gaps:`);
  for (const [file, stats] of ranked) {
    log(`    ${file} — ${stats.gapCount} uncovered locations`);
  }

  // ── Step 3: Extract test map (from .coverage DB if available) ──
  log("\n━━━ Step 2: Building test map ━━━");
  let testMap = new Map<string, { testFile: string; arcCount: number }[]>();
  try {
    testMap = await extractTestMap(packageDir, cfg.runner.coverageDbPath, cfg.paths.sourcePrefix);
    if (testMap.size > 0) {
      log(`    ✅ Test map: ${testMap.size} source files → test file mappings`);
    } else {
      log("    ℹ️  No test map available (no .coverage DB with context tracking)");
    }
  } catch (e) {
    log(`    ⚠️  Test map extraction failed: ${(e as Error).message}`);
  }

  // ── Step 3: Read test directory ──
  log("\n━━━ Step 3: Reading test directory ━━━");
  const testDir = resolve(packageDir, cfg.paths.testDir);
  const entries = await readTestEntries(testDir, cfg);
  const scan = scanTestDir(entries, cfg);
  const specFiles = scan.specFiles(testDir);
  log(`    📁 ${specFiles.length} spec file(s), ${entries.length} total entries`);

  // ── Step 4: Discover source files & read fixtures ──
  const allSourceFiles = await discoverSourceFiles(packageDir, cfg);
  log(`    📁 ${allSourceFiles.length} source files discovered for context resolution`);

  // Read fixture/helper files from test directory
  // Fixture = any test dir file NOT in the spec files list (conftest.py, helpers, etc.)
  const specAbsSet = new Set(specFiles);
  const fixtureFiles: { path: string; content: string }[] = [];
  const MAX_FIXTURE_LINES = 200;
  for (const entry of entries) {
    const absEntry = join(testDir, entry);
    if (specAbsSet.has(absEntry)) continue;
    if (entry.includes("__pycache__")) continue;
    const content = await tryReadFile(absEntry);
    if (!content) continue;
    const lines = content.split("\n");
    const truncated =
      lines.length > MAX_FIXTURE_LINES
        ? lines.slice(0, MAX_FIXTURE_LINES).join("\n") +
          `\n... (truncated at ${MAX_FIXTURE_LINES} lines)`
        : content;
    fixtureFiles.push({ path: `${cfg.paths.testDir}/${entry}`, content: truncated });
  }
  if (fixtureFiles.length > 0) {
    log(
      `    📎 ${fixtureFiles.length} fixture/helper file(s): ${fixtureFiles.map((f) => f.path).join(", ")}`,
    );
  }

  // ── Step 5: Process each gap file ──
  log("\n━━━ Step 4: Generating tests ━━━");
  let totalBatches = 0;
  const parallel = cfg.loop.concurrency > 1;

  const promptCtxBase = {
    examples: cfg.examples,
    language: cfg.language,
    testDir: cfg.paths.testDir,
    specFiles,
    fixtureFiles: fixtureFiles.length > 0 ? fixtureFiles : undefined,
  };

  /** Process a single source file: resolve context → batch generate → fix. */
  async function processSourceFile(
    fileIdx: number,
    file: string,
    stats: { gapCount: number },
  ): Promise<number> {
    const prefix = parallel ? `[${fileIdx + 1}] ` : "";
    const fileLog = (msg: string) => log(`${prefix}${msg}`);

    if (options.signal?.aborted) return 0;
    fileLog(`\n🎯 [${fileIdx + 1}/${ranked.length}] ${file} (${stats.gapCount} gaps)`);

    // Get all gaps for this file, merge adjacent branch arcs
    const fileGaps = filterGapsForFile(gapsResult, file);
    const gaps = mergeAdjacentGaps(fileGaps.gaps);
    if (gaps.length === 0) return 0;

    // Context resolution: ask LLM what files it needs
    fileLog("    🔗 Resolving context...");
    let contextFiles: ContextFile[] = [];
    try {
      const annotated = annotateSource(
        (await tryReadFile(resolve(packageDir, file))) ?? "",
        gaps,
        commentPrefixFor(cfg.language.outputExtension),
      );
      contextFiles = await resolveContext({
        packageDir,
        sourceFile: file,
        annotatedSource: annotated,
        allSourceFiles,
        codeFence: codeFenceFor(cfg.language.outputExtension),
        model: cfg.llm.model,
        llmStats,
        signal: options.signal,
        onProgress: parallel
          ? undefined
          : (tokens) =>
              process.stdout.write(`\r    🔗 Resolving context... (${tokens} tokens)`),
      });
      if (!parallel) process.stdout.write("\n");
      if (contextFiles.length > 0) {
        fileLog(`    ✅ Context: ${contextFiles.map((f) => f.path).join(", ")}`);
      }
    } catch (e) {
      fileLog(`    ⚠️  Context resolution failed: ${(e as Error).message}`);
    }

    // Look up existing tests from test map
    let existingTests: string | undefined;
    const testEntries = testMap.get(file);
    if (testEntries && testEntries.length > 0) {
      const topTestFile = testEntries[0].testFile;
      const testContent = await tryReadFile(resolve(packageDir, topTestFile));
      if (testContent) {
        const maxLines = 300;
        const testLines = testContent.split("\n");
        existingTests =
          testLines.length > maxLines
            ? testLines.slice(0, maxLines).join("\n") + `\n... (truncated at ${maxLines} lines)`
            : testContent;
        fileLog(`    📋 Existing tests: ${topTestFile} (${testLines.length} lines)`);
      }
    }

    // Chunk gaps into batches
    const batchSize = cfg.loop.gapBatchSize;
    const batches: CoverageGap[][] = [];
    for (let i = 0; i < gaps.length; i += batchSize) {
      batches.push(gaps.slice(i, i + batchSize));
    }

    fileLog(`    📦 ${batches.length} batch(es) of ≤${batchSize} branches`);

    // Track test functions generated by earlier batches for this file
    const priorBatchTests: string[] = [];
    let fileBatches = 0;

    for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
      if (options.signal?.aborted) break;
      const batch = batches[batchIdx];
      fileBatches++;

      fileLog(`\n    ── Batch ${batchIdx + 1}/${batches.length} (${batch.length} branches) ──`);

      // Build prompt with annotated source + context + existing tests + prior batch info
      const prompt = await buildPrompt(packageDir, file, {
        ...promptCtxBase,
        contextFiles,
        existingTests,
        gapBatch: batch,
        batchIndex: batchIdx + 1,
        priorBatchTests: priorBatchTests.length > 0 ? priorBatchTests : undefined,
      });

      const singlePassSchema = JSON.stringify(SinglePassResponse.toJSONSchema(), null, 2);
      const augmented = `${prompt}\n\nRespond with ONLY valid JSON matching this schema — no markdown fences, no explanation, just the raw JSON object:\n${singlePassSchema}`;

      if (dryRun) {
        fileLog("    🤖 [DRY RUN] Would generate tests...");
        fileLog(`    Prompt length: ${augmented.length} chars`);
        continue;
      }

      fileLog("    🤖 Generating tests...");
      const sendOpts: SendOptions = {
        model: cfg.llm.model,
        signal: options.signal,
        onProgress: parallel
          ? undefined
          : (tokens) =>
              process.stdout.write(`\r    🤖 Generating tests... (${tokens} tokens)`),
      };

      try {
        const { content, inputTokens, outputTokens, durationMs } = await send(augmented, sendOpts);
        llmStats.push({ inputTokens, outputTokens, durationMs });
        if (!parallel) process.stdout.write("\n");

        const response = SinglePassResponse.parse(JSON.parse(content));
        if (!generatedFiles.includes(response.path)) {
          generatedFiles.push(response.path);
        }

        if (response.analysis) {
          for (const a of response.analysis) {
            fileLog(`      📝 L${a.marker_line}: ${a.test_function}`);
            priorBatchTests.push(`${response.path}::${a.test_function}`);
          }
        }

        fileLog(`    📝 → ${response.path}`);

        // Merge if file already exists, then write and fix
        const finalCode = await mergeIfExists(
          packageDir,
          response.path,
          response.code,
          cfg,
          llmStats,
          options.signal,
        );
        await writeAndFix(
          packageDir,
          response.path,
          finalCode,
          cfg,
          fileLog,
          llmStats,
          options.signal,
          file,
        );
      } catch (e) {
        fileLog(`    ❌ Generation failed: ${(e as Error).message}`);
      }
    }
    return fileBatches;
  }

  // Process source files — parallel or sequential
  const concurrency = cfg.loop.concurrency;
  if (concurrency <= 1) {
    for (let i = 0; i < ranked.length; i++) {
      if (options.signal?.aborted) break;
      const [file, stats] = ranked[i];
      totalBatches += await processSourceFile(i, file, stats);
    }
  } else {
    log(`\n⚡ Processing ${ranked.length} source files with concurrency=${concurrency}`);
    totalBatches = await runParallel(
      ranked.map(([file, stats], idx) => () => processSourceFile(idx, file, stats)),
      concurrency,
      options.signal,
    );
  }

  // ── Step 6: Full-suite validation & isolation fix ──
  let finalBranchCov = initialBranchCov;
  if (!dryRun && generatedFiles.length > 0) {
    log("\n━━━ Step 5: Full-suite validation ━━━");
    const suiteResult = await runFullSuite(cfg.runner.command, packageDir, cfg);

    if (suiteResult.passed) {
      log("    ✅ Full suite passes — no isolation issues");
    } else {
      log(
        `    ⚠️  Full suite has failures — fixing ${generatedFiles.length} generated file(s)...`,
      );
      await isolationFixLoop(
        packageDir,
        generatedFiles,
        cfg,
        log,
        llmStats,
        suiteResult.output,
        options.signal,
      );
    }

    // Measure final coverage
    log("\n━━━ Step 6: Final coverage measurement ━━━");
    await runTests(cfg.runner.command, packageDir, log, cfg);
    try {
      const finalGaps = await extractGaps(packageDir, {
        coveragePath: cfg.runner.coveragePath,
        sourcePrefix: cfg.paths.sourcePrefix,
        sourceExclusions: cfg.paths.sourceExclusions,
        coverageFormat: cfg.runner.coverageFormat,
      });
      finalBranchCov = computeBranchCoverage(finalGaps.fileStats);
      log(
        `\n📊 Final branch coverage: ${finalBranchCov.toFixed(1)}% (was ${initialBranchCov.toFixed(1)}%)`,
      );
      log(`📈 Improvement: +${(finalBranchCov - initialBranchCov).toFixed(1)}%`);
    } catch {
      log("    ⚠️  Could not measure final coverage");
    }
  }

  await stopClient();

  log(`\n✅ Done: ${generatedFiles.length} files generated across ${totalBatches} batches`);

  return buildReport(
    initialBranchCov,
    finalBranchCov,
    generatedFiles,
    llmStats,
    wallStart,
    totalBatches,
  );
}

/**
 * Discover all source files under the sourcePrefix in the package directory.
 * Used to provide the full file list for LLM context resolution.
 */
async function discoverSourceFiles(packageDir: string, cfg: Config): Promise<string[]> {
  const sourceDir = resolve(packageDir, cfg.paths.sourcePrefix);
  try {
    const entries = await readdir(sourceDir, { recursive: true });
    return entries
      .filter((e) => {
        // Filter to code files
        const ext = e.slice(e.lastIndexOf("."));
        const codeExts = [
          ".py",
          ".ts",
          ".js",
          ".java",
          ".go",
          ".cs",
          ".rb",
          ".rs",
          ".cpp",
          ".c",
          ".h",
        ];
        return codeExts.includes(ext);
      })
      .filter((e) => !cfg.paths.sourceExclusions?.some((ex) => e.includes(ex)))
      .map((e) => `${cfg.paths.sourcePrefix}${e}`)
      .sort();
  } catch {
    return [];
  }
}

function buildReport(
  initialBranchCoverage: number,
  finalBranchCoverage: number,
  generatedFiles: string[],
  llmStats: LlmCallStats[],
  wallStart: number,
  iterations: number,
): RunReport {
  return {
    initialBranchCoverage,
    finalBranchCoverage,
    generatedFiles,
    totalInputTokens: llmStats.reduce((s, c) => s + c.inputTokens, 0),
    totalOutputTokens: llmStats.reduce((s, c) => s + c.outputTokens, 0),
    totalDurationMs: llmStats.reduce((s, c) => s + c.durationMs, 0),
    wallClockMs: Date.now() - wallStart,
    llmCalls: llmStats.length,
    iterations,
  };
}
