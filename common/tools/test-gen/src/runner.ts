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
import { writeFile, readdir, mkdir } from "node:fs/promises";
import { extractGaps, computeBranchCoverage } from "./extract-gaps.ts";
import type { ExtractGapsResult } from "./extract-gaps.ts";
import { buildPrompt } from "./build-prompt.ts";
import { stopClient, send } from "./llm.ts";
import type { SendOptions } from "./llm.ts";
import { tryReadFile } from "./utils.ts";
import { resolveConfig, codeFenceFor } from "./config.ts";
import type { Config } from "./config.ts";
import { aiLoop, loop } from "./loop/index.ts";
import type { RunReport, LlmCallStats } from "./types.ts";
import { z } from "zod";

const execAsync = promisify(exec);

/** Build the test generation response schema using config values. */
function testGenSchema(cfg: Config): z.ZodObject<{ path: z.ZodString; code: z.ZodString }> {
  const fence = codeFenceFor(cfg.language.outputExtension);
  return z.object({
    path: z.string().describe(
      `Relative test file path starting with ${cfg.paths.testDir}/ and ending with ${cfg.language.outputExtension}`,
    ),
    code: z.string().describe(
      `The complete generated ${fence} test file content`,
    ),
  });
}

const MergeResponse = z.object({
  code: z.string().describe("The merged test file content"),
});

const FixResponse = z.object({
  code: z.string().describe("The corrected test file content"),
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
    if (i === -1) { i = 0; break; }
    count++;
  }
  return i === 0 ? text : text.slice(i + 1);
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

  const { content, inputTokens, outputTokens, durationMs } = await send(prompt, { model: cfg.llm.model, signal });
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
): Promise<void> {
  const absPath = resolve(packageDir, relPath);
  await mkdir(dirname(absPath), { recursive: true });
  await writeFile(absPath, code, "utf8");

  const maxFix = cfg.loop.fixMaxIterations;
  if (maxFix <= 0) return;

  const { testFramework } = cfg.language;
  const codeFence = codeFenceFor(cfg.language.outputExtension);
  const fixSchema = JSON.stringify(FixResponse.toJSONSchema(), null, 2);

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
        const prompt = `The following ${testFramework} test file has failures. Fix the code so all tests pass.

## Test File (\`${relPath}\`)

\`\`\`${codeFence}
${ctx.currentCode}
\`\`\`

## Test Output (errors)

\`\`\`
${ctx.errors}
\`\`\`

## Instructions

1. Fix ONLY the failing tests — do NOT remove, skip, or delete any test.
2. **Every existing describe/it block must remain in the output.** Never replace a failing test with a skip or a placeholder.
3. Preserve the file structure, all passing tests, imports, and helpers verbatim.
4. Only change what is strictly necessary to make the failing tests pass.
5. Return the complete corrected file — no omissions.

Respond with ONLY valid JSON matching this schema — no markdown fences, no explanation, just the raw JSON object:
${fixSchema}`;

        const { content, inputTokens, outputTokens, durationMs } = await send(prompt, { model: cfg.llm.model, signal });
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

export interface RunOptions {
  packageDir: string;
  dryRun?: boolean;
  onProgress?: (msg: string) => void;
  signal?: AbortSignal;
  /** Partial config overrides — merged over defaults. */
  config?: Partial<{ [K in keyof Config]: Partial<Config[K]> }>;
}

interface CoverageContext {
  cfg: Config;
  packageDir: string;
  branchCov: number;
  /** Queue of source files to generate tests for before re-measuring. */
  batch: string[];
  gapsResult: ExtractGapsResult | null;
  specFiles: string[];
  folderTree: string;
}

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

function scanTestDir(entries: string[], cfg: Config): {
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
        (e) =>
          e.endsWith(paths.specSuffix) &&
          !paths.specExclusions.some((ex) => e.includes(ex)),
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

export async function runLoop(options: RunOptions): Promise<RunReport> {
  const wallStart = Date.now();
  const cfg = resolveConfig(options.config);
  const { packageDir, dryRun = false } = options;
  const log = options.onProgress ?? console.log;
  const TestGenResponse = testGenSchema(cfg);
  const testGenJsonSchema = JSON.stringify(TestGenResponse.toJSONSchema(), null, 2);
  const llmStats: LlmCallStats[] = [];
  const generatedFiles: string[] = [];

  log("╔══════════════════════════════════════════════════════════════╗");
  log("║  Coverage-Driven Test Generation Loop                       ║");
  log("╠══════════════════════════════════════════════════════════════╣");
  log(`║  Target:   ${cfg.loop.targetCoverage}% branch coverage`);
  log(`║  Max iter: ${cfg.loop.maxIterations}`);
  log(`║  Batch:    ${cfg.loop.batchSize} files per measurement`);
  log(`║  Fix iter: ${cfg.loop.fixMaxIterations} per file`);
  if (dryRun) log("║  Mode:     dry-run (print only, no writes)");
  log("╚══════════════════════════════════════════════════════════════╝");

  const promptCtxBase = {
    examples: cfg.examples,
    language: cfg.language,
    testDir: cfg.paths.testDir,
  };

  // ── Dry-run: generate tests and print to console without writing to disk ──
  if (dryRun) {
    await runTests(cfg.runner.command, packageDir, log, cfg);

    let gapsResult: ExtractGapsResult;
    try {
      gapsResult = await extractGaps(packageDir, {
        coveragePath: cfg.runner.coveragePath,
        sourcePrefix: cfg.paths.sourcePrefix,
        coverageFormat: cfg.runner.coverageFormat,
      });
    } catch {
      log(`\n❌ ${cfg.runner.coveragePath} not generated.`);
      return buildReport(0, 0, [], llmStats, wallStart, 0);
    }

    const branchCov = computeBranchCoverage(gapsResult.fileStats);
    log(`\n📊 Branch coverage: ${branchCov.toFixed(1)}%`);

    const ranked = Object.entries(gapsResult.fileStats)
      .filter(([, s]) => s.gapCount > 0)
      .sort(([, a], [, b]) => b.gapCount - a.gapCount)
      .slice(0, cfg.loop.maxIterations);

    if (ranked.length === 0) {
      log("\n✅ No coverage gaps found!");
      return buildReport(branchCov, branchCov, [], llmStats, wallStart, 0);
    }

    const testDir = resolve(packageDir, cfg.paths.testDir);
    const entries = await readTestEntries(testDir, cfg);
    const { folderTree, specFiles } = scanTestDir(entries, cfg);
    const specs = specFiles(testDir);

    for (let i = 0; i < ranked.length; i++) {
      if (options.signal?.aborted) break;
      const [file] = ranked[i];
      log(`\n🎯 [${i + 1}/${ranked.length}] Targeting: ${file}`);

      const prompt = await buildPrompt(packageDir, file, {
        ...promptCtxBase,
        gapsResult,
        folderTree,
        specFiles: specs,
      });

      const augmented = `${prompt}\n\nRespond with ONLY valid JSON matching this schema — no markdown fences, no explanation, just the raw JSON object:\n${testGenJsonSchema}`;
      log("    🤖 Generating tests...");
      const sendOpts: SendOptions = {
        model: cfg.llm.model,
        signal: options.signal,
        onProgress: (tokens) => process.stdout.write(`\r    🤖 Generating tests... (${tokens} tokens)`),
      };
      const { content, inputTokens, outputTokens, durationMs } = await send(augmented, sendOpts);
      llmStats.push({ inputTokens, outputTokens, durationMs });
      process.stdout.write("\n");
      const response = TestGenResponse.parse(JSON.parse(content));

      generatedFiles.push(response.path);
      log(`\n  ── ${response.path} ──`);
      log(response.code);
    }

    await stopClient();
    return buildReport(branchCov, branchCov, generatedFiles, llmStats, wallStart, ranked.length);
  }

  // ── Normal mode: iterative measure → act loop ──
  let initialBranchCov = -1;
  const ctx: CoverageContext = {
    cfg,
    packageDir,
    branchCov: 0,
    batch: [],
    gapsResult: null,
    specFiles: [],
    folderTree: "",
  };

  const iterations = await aiLoop<CoverageContext>(
    {
      async isTerminal(ctx, iteration) {
        // If batch still has files, keep going without re-measuring
        if (ctx.batch.length > 0) {
          log(`\n  ⏩ Batch has ${ctx.batch.length} file(s) remaining — skipping full test run`);
          return false;
        }

        // Batch drained — run full suite and re-measure coverage
        log(`\n${"━".repeat(60)}`);
        log(`  ITERATION ${iteration} — measuring coverage`);
        log("━".repeat(60));

        await runTests(ctx.cfg.runner.command, ctx.packageDir, log, ctx.cfg);

        try {
          ctx.gapsResult = await extractGaps(
            ctx.packageDir, {
              coveragePath: ctx.cfg.runner.coveragePath,
              sourcePrefix: ctx.cfg.paths.sourcePrefix,
              coverageFormat: ctx.cfg.runner.coverageFormat,
            },
          );
        } catch {
          log(`\n❌ ${ctx.cfg.runner.coveragePath} not generated.`);
          log("   Ensure the test config includes a JSON coverage reporter.");
          return true;
        }

        ctx.branchCov = computeBranchCoverage(ctx.gapsResult.fileStats);
        if (initialBranchCov < 0) initialBranchCov = ctx.branchCov;
        log(`\n📊 Branch coverage: ${ctx.branchCov.toFixed(1)}%`);

        if (ctx.branchCov >= ctx.cfg.loop.targetCoverage) {
          log(`\n✅ Target ${ctx.cfg.loop.targetCoverage}% reached! (actual: ${ctx.branchCov.toFixed(1)}%)`);
          return true;
        }

        // Populate batch with top N gap files
        const ranked = Object.entries(ctx.gapsResult.fileStats)
          .filter(([, s]) => s.gapCount > 0)
          .sort(([, a], [, b]) => b.gapCount - a.gapCount);

        if (ranked.length === 0) {
          log("\n✅ No more coverage gaps found!");
          return true;
        }

        ctx.batch = ranked
          .slice(0, ctx.cfg.loop.batchSize)
          .map(([file]) => file);

        log(`\n📦 Batch: ${ctx.batch.join(", ")}`);

        // Refresh test dir metadata for the batch
        const testDir = resolve(ctx.packageDir, ctx.cfg.paths.testDir);
        const entries = await readTestEntries(testDir, ctx.cfg);
        const scan = scanTestDir(entries, ctx.cfg);
        ctx.specFiles = scan.specFiles(testDir);
        ctx.folderTree = scan.folderTree;

        return false;
      },

      async act(ctx, _iteration) {
        const file = ctx.batch.shift()!;
        log(`\n🎯 Targeting: ${file}`);

        const prompt = await buildPrompt(ctx.packageDir, file, {
          ...promptCtxBase,
          gapsResult: ctx.gapsResult!,
          folderTree: ctx.folderTree,
          specFiles: ctx.specFiles,
        });

        return {
          prompt,
          schema: TestGenResponse,
          async onResponse(response) {
            const finalCode = await mergeIfExists(
              ctx.packageDir, response.path, response.code, ctx.cfg, llmStats,
            );
            generatedFiles.push(response.path);
            log(`  📝 ${file} → ${response.path}`);
            await writeAndFix(ctx.packageDir, response.path, finalCode, ctx.cfg, log, llmStats, options.signal);
          },
        };
      },
    },
    ctx,
    { maxIterations: cfg.loop.maxIterations, model: cfg.llm.model, signal: options.signal,
      onProgress: (tokens) => process.stdout.write(`\r    🤖 Generating... (${tokens} tokens)`),
      llmStats },
  );

  return buildReport(
    initialBranchCov < 0 ? 0 : initialBranchCov,
    ctx.branchCov,
    generatedFiles,
    llmStats,
    wallStart,
    iterations,
  );
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
