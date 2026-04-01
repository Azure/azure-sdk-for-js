// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * runner.ts
 *
 * Coverage-specific implementation that targets one file per iteration.
 */

import { exec, spawn } from "node:child_process";
import { promisify } from "node:util";
import { resolve, join, dirname, basename } from "node:path";
import { writeFile, readFile, readdir, mkdir, appendFile as appendFileAsync, unlink } from "node:fs/promises";
import { appendFileSync } from "node:fs";
import { extractGaps, computeBranchCoverage, filterGapsForFile } from "./extract-gaps.ts";
import type { ExtractGapsResult } from "./extract-gaps.ts";
import type { CoverageGap } from "./types.ts";
import { buildPromptSeed, buildBatchDeltaPrompt, buildPlannerPrompt, buildCoderPrompt } from "./build-prompt.ts";
import type { PlannerResult } from "./build-prompt.ts";
import { extractTestMap } from "./extract-test-map.ts";
import { resolveContext } from "./resolve-context.ts";
import type { ContextFile } from "./resolve-context.ts";
import {
  stopClient,
  send,
  seedSession,
  configureLlm,
  getLlmTelemetry,
  checkQuota,
  compactSessionIfNeeded,
} from "./llm.ts";
import type { SendAttachment, SendOptions } from "./llm.ts";
import { tryReadFile, fileExists } from "./utils.ts";
import { resolveConfig, codeFenceFor } from "./config.ts";
import type { Config } from "./config.ts";
import { loop } from "./loop/index.ts";
import { annotateSource, commentPrefixFor, mergeAdjacentGaps } from "./annotate-source.ts";
import type { RunReport, LlmCallStats } from "./types.ts";
import { buildFocusedFileAttachment } from "./attachment-helpers.ts";
import { z } from "zod";
import { renderPromptTemplate } from "./prompt-templates.ts";
import { PromptCache, hashText } from "./prompt-cache.ts";
import { initDeepLog, deepLog, getDeepLogPath } from "./deep-log.ts";
import { parseJsonResponse } from "./parse-json-response.ts";

const execAsync = promisify(exec);

// ── Verbose disk logging for subprocess output ──
let _verboseLogPath: string | undefined;

/** Set the path for verbose subprocess logging. Call once at startup. */
export function setVerboseLogPath(path: string): void {
  _verboseLogPath = path;
  try { appendFileSync(path, `\n=== verbose log started ${new Date().toISOString()} ===\n`); } catch {}
}

/** Append a message to the verbose log (sync, fire-and-forget). */
function verboseLog(msg: string): void {
  if (!_verboseLogPath) return;
  const ts = new Date().toISOString().slice(11, 19);
  try { appendFileSync(_verboseLogPath, `[${ts}] ${msg}\n`); } catch {}
}

/**
 * Run a command with streaming output to the verbose log.
 * Returns { stdout, exitCode }. Rejects on timeout.
 */
function execStreaming(
  command: string,
  opts: { cwd: string; timeout: number; maxBuffer?: number; label?: string },
): Promise<{ stdout: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const label = opts.label ?? command.slice(0, 80);
    verboseLog(`[EXEC] ${label}`);
    verboseLog(`  cmd: ${command.slice(0, 200)}`);

    const child = spawn("sh", ["-c", command], {
      cwd: opts.cwd,
      env: { ...process.env },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let lastLine = "";
    const maxBuf = opts.maxBuffer ?? 50 * 1024 * 1024;
    let killed = false;

    const timer = setTimeout(() => {
      killed = true;
      child.kill("SIGKILL");
      verboseLog(`[TIMEOUT] ${label} killed after ${opts.timeout}ms`);
      reject(new Error(`Command timed out after ${opts.timeout}ms: ${label}`));
    }, opts.timeout);

    child.stdout?.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      stdout += text;
      // Log last line to verbose log for progress tracking
      const lines = text.split("\n").filter(Boolean);
      if (lines.length > 0) {
        lastLine = lines[lines.length - 1];
        verboseLog(`  [out] ${lastLine.slice(0, 200)}`);
      }
      if (stdout.length > maxBuf) {
        killed = true;
        child.kill("SIGKILL");
        verboseLog(`[MAXBUF] ${label} output exceeded ${maxBuf} bytes`);
      }
    });

    child.stderr?.on("data", (chunk: Buffer) => {
      const text = chunk.toString().trim();
      if (text) verboseLog(`  [err] ${text.slice(0, 200)}`);
    });

    child.on("close", (code) => {
      clearTimeout(timer);
      if (killed) return;
      verboseLog(`[EXIT] ${label} code=${code} stdout=${stdout.length} bytes`);
      resolve({ stdout, exitCode: code ?? 1 });
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      verboseLog(`[ERROR] ${label}: ${err.message}`);
      reject(err);
    });
  });
}

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

// ── Azure CLI token refresh ──

/** Cached token expiry (epoch ms) to avoid shelling out on every batch. */
let _azTokenExpiresAt = 0;
/** Whether `az` CLI is available on this machine (detected once). */
let _azCliAvailable: boolean | undefined;

/**
 * Check the Azure CLI token and refresh it (via `az login`) if it is
 * expired or within 5 minutes of expiring.
 *
 * Automatically detects whether `az` CLI is installed on first call.
 * On machines without `az` this is a no-op. Designed to be called
 * frequently (e.g. before each batch) — it only shells out to
 * `az account get-access-token` when the cached expiry is stale,
 * and only triggers `az login` when the token actually needs refreshing.
 */
async function ensureAzureAuth(
  log: (msg: string) => void,
): Promise<void> {
  const LEAD_TIME_MS = 5 * 60 * 1000; // 5 minutes
  const now = Date.now();

  // One-time probe: is `az` even installed?
  if (_azCliAvailable === undefined) {
    try {
      await execAsync("az --version 2>/dev/null", { timeout: 10_000 });
      _azCliAvailable = true;
    } catch {
      _azCliAvailable = false;
      log("ℹ️  Azure CLI not found — skipping automatic token refresh.");
    }
  }
  if (!_azCliAvailable) return;

  // Fast path: cached expiry is still well in the future
  if (_azTokenExpiresAt - now > LEAD_TIME_MS) return;

  // Shell out to check the real token expiry
  try {
    const { stdout } = await execAsync(
      "az account get-access-token --query expiresOn -o tsv 2>/dev/null",
      { timeout: 15_000 },
    );
    const expiresOn = new Date(stdout.trim()).getTime();
    if (!Number.isNaN(expiresOn)) {
      _azTokenExpiresAt = expiresOn;
      const remaining = expiresOn - now;
      if (remaining > LEAD_TIME_MS) return;
      log(`\n🔑 Azure CLI token expires in ${Math.round(remaining / 1000)}s — refreshing…`);
    }
  } catch {
    log("\n🔑 Azure CLI token check failed — attempting refresh…");
  }

  // Token expired or about to expire — retry `az login` until it succeeds
  while (true) {
    log("🔑 Running `az login` — please complete authentication in the browser…");
    try {
      await execAsync("az login 2>&1", {
        timeout: 300_000, // 5 min per attempt for user to complete browser auth
      });
      try {
        const { stdout: newExpiry } = await execAsync(
          "az account get-access-token --query expiresOn -o tsv 2>/dev/null",
          { timeout: 15_000 },
        );
        _azTokenExpiresAt = new Date(newExpiry.trim()).getTime();
      } catch {
        _azTokenExpiresAt = Date.now() + 60 * 60 * 1000; // optimistic 1h
      }
      log(`🔑 Azure CLI token refreshed — valid until ${new Date(_azTokenExpiresAt).toISOString()}`);
      return; // success — resume experiment
    } catch (e) {
      const err = e as { message?: string };
      log(`⚠️  az login attempt failed: ${err.message?.slice(0, 200) ?? "unknown error"}`);
      log("⏸️  Experiment paused — retrying az login in 30s…");
      await new Promise((r) => setTimeout(r, 30_000));
    }
  }
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
    const { stdout, exitCode } = await execStreaming(`${command} 2>&1`, {
      cwd: packageDir,
      timeout: cfg.runner.timeout,
      maxBuffer: cfg.runner.maxBuffer,
      label: `test ${relPath}`,
    });
    if (exitCode !== 0) {
      return { passed: false, output: extractErrorContext(stdout, cfg.runner.tailLines, cfg.runner.testOutputPatterns) };
    }
    return { passed: true, output: tail(stdout, cfg.runner.tailLines) };
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message?: string };
    const output = [err.stdout, err.stderr, err.message].filter(Boolean).join("\n") || "Unknown error";
    return { passed: false, output: extractErrorContext(output, cfg.runner.tailLines, cfg.runner.testOutputPatterns) };
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
 * Extract error-relevant lines from test runner output.
 * Captures stack trace frames, assertion messages, and error summaries.
 * Falls back to tail() if no structured errors are found.
 */
function extractErrorContext(text: string, maxLines: number, extraPatterns?: { pattern: RegExp; label: string }[]): string {
  const lines = text.split("\n");

  // Built-in language-agnostic patterns
  const errorPatterns: RegExp[] = [
    /^\s*(Traceback|File ".*", line \d+)/i, // Python tracebacks
    /^\s*(at\s+\S+\s+\(.*:\d+:\d+\))/, // JS/TS stack frames
    /^\s*(Error|TypeError|SyntaxError|IndentationError|AssertionError|ImportError|AttributeError|NameError|ValueError|KeyError|ModuleNotFoundError|RuntimeError)\b/i,
    /^\s*(FAILED|ERRORS|ERROR|E\s+)/, // Test runner error indicators
    /^\s*(assert|AssertionError|expect\()/i, // Assertion lines
    /:\d+:\s*error\b/i, // Compiler-style errors
    /^\s*raise\s+/, // Raise statements
    /^\s*\^+\s*$/, // Caret error position indicators
  ];

  // Append any config-provided test output patterns
  if (extraPatterns) {
    for (const { pattern } of extraPatterns) {
      errorPatterns.push(pattern);
    }
  }

  // Exclude lines that are primarily about warnings (Python deprecation/future warnings, etc.)
  const warningExclusion = /\w*Warning\s*[:(]/;

  const contextRadius = 5; // lines of context around each match
  const maxOutputLines = 150; // generous limit to preserve deep stack traces
  const matchedIndices = new Set<number>();

  for (let i = 0; i < lines.length; i++) {
    if (warningExclusion.test(lines[i])) continue;
    if (errorPatterns.some((pat) => pat.test(lines[i]))) {
      for (
        let j = Math.max(0, i - contextRadius);
        j <= Math.min(lines.length - 1, i + contextRadius);
        j++
      ) {
        matchedIndices.add(j);
      }
    }
  }

  if (matchedIndices.size === 0) {
    return tail(text, maxLines);
  }

  // Merge matched indices into contiguous ranges and extract
  const sorted = Array.from(matchedIndices).sort((a, b) => a - b);
  const result: string[] = [];
  let prevIdx = -10;

  for (const idx of sorted) {
    if (idx > prevIdx + 1 && result.length > 0) {
      result.push("  ...");
    }
    result.push(lines[idx]);
    prevIdx = idx;
  }

  const extracted = result.join("\n");
  // If extracted is too short to be useful (< 50 chars), supplement with raw tail
  if (extracted.length < 50) {
    return extracted + "\n---\n" + tail(text, maxLines);
  }
  // If extracted has few lines, supplement with tail
  if (result.length < 5) {
    return extracted + "\n---\n" + tail(text, Math.max(20, maxOutputLines - result.length));
  }
  // Cap output length
  if (result.length > maxOutputLines) {
    return result.slice(0, maxOutputLines).join("\n") + "\n... (truncated)";
  }
  return extracted;
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
    const p = task()
      .then((n) => {
        total += n;
      })
      .catch((e) => {
        console.error(`⚠️  Parallel task failed: ${(e as Error).message}`);
      })
      .finally(() => {
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

function chooseAdaptiveBatchSize(
  base: number,
  gapCount: number,
  staticPromptChars: number,
): number {
  const cap = Math.max(base, Math.min(20, gapCount));
  let size = base;
  if (staticPromptChars <= 12_000) {
    size = Math.max(size, base * 3);
  } else if (staticPromptChars <= 24_000) {
    size = Math.max(size, base * 2);
  } else if (staticPromptChars <= 40_000) {
    size = Math.max(size, Math.ceil(base * 1.5));
  }
  return Math.min(cap, size);
}

function isLlmTimeoutError(error: unknown): boolean {
  return (error as Error)?.message?.includes("LLM response timeout") ?? false;
}

function extractIsolationTokens(path: string, code: string): string[] {
  const tokens = new Set<string>();
  const base =
    path
      .split("/")
      .pop()
      ?.replace(/\.[^.]+$/, "") ?? path;
  tokens.add(base);

  for (const match of code.matchAll(/\btest_[A-Za-z0-9_]+\b/g)) {
    tokens.add(match[0]);
  }

  return Array.from(tokens);
}

function scoreIsolationBatch(path: string, code: string, errors: string): number {
  const haystack = errors.toLowerCase();
  let score = 0;
  for (const token of extractIsolationTokens(path, code)) {
    const needle = token.toLowerCase();
    if (!needle) continue;
    const matches = haystack.match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"));
    score += matches?.length ?? 0;
  }
  return score;
}

function buildIsolationBatches(
  fileCodes: Map<string, string>,
  errors: string,
  batchSize: number,
): Array<Array<[string, string]>> {
  const scored = Array.from(fileCodes.entries())
    .map(([path, code]) => ({ path, code, score: scoreIsolationBatch(path, code, errors) }))
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));

  const batches: Array<Array<[string, string]>> = [];
  for (let i = 0; i < scored.length; i += batchSize) {
    batches.push(scored.slice(i, i + batchSize).map(({ path, code }) => [path, code]));
  }
  return batches;
}

function extractReferencedLines(text: string, relPath: string): number[] {
  const escapedPath = relPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`${escapedPath}:(\\d+)(?::\\d+)?`, "g"),
    new RegExp(`${escapedPath.replace(/\//g, "[/\\\\]")}(?::|\\()\\s*(\\d+)`, "g"),
  ];
  const lines = new Set<number>();
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const line = Number(match[1]);
      if (Number.isFinite(line) && line > 0) lines.add(line);
    }
  }
  return Array.from(lines).sort((a, b) => a - b);
}

/**
 * Run the full test suite command and return pass/fail + output.
 * Unlike `runTests()` which logs and continues, this captures the result.
 */
async function runFullSuite(command: string, packageDir: string, cfg: Config): Promise<TestResult> {
  try {
    const { stdout, exitCode } = await execStreaming(`${command} 2>&1`, {
      cwd: packageDir,
      timeout: cfg.runner.timeout,
      maxBuffer: cfg.runner.maxBuffer,
      label: "full-suite",
    });
    if (exitCode !== 0) {
      return { passed: false, output: extractErrorContext(stdout, cfg.runner.tailLines, cfg.runner.testOutputPatterns) };
    }
    return { passed: true, output: tail(stdout, cfg.runner.tailLines) };
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message?: string };
    const output = [err.stdout, err.stderr, err.message].filter(Boolean).join("\n") || "Unknown error";
    return { passed: false, output: extractErrorContext(output, cfg.runner.tailLines, cfg.runner.testOutputPatterns) };
  }
}

/**
 * In e2e mode, reject generated code that contains mocking constructs.
 * Returns an error message if mocks are detected, or undefined if clean.
 */
function detectMockViolations(code: string, cfg: Config): string | undefined {
  const isE2eMode = !!(cfg.paths.testContextDirs && cfg.paths.testContextDirs.length > 0);
  if (!isE2eMode) return undefined;

  const mockPatterns = cfg.runner.mockGuardPatterns;
  if (!mockPatterns || mockPatterns.length === 0) return undefined;

  const violations: string[] = [];
  for (const { pattern, label } of mockPatterns) {
    if (pattern.test(code)) {
      violations.push(label);
    }
  }
  return violations.length > 0
    ? `e2e mock violation: ${violations.join(", ")}`
    : undefined;
}

/**
 * If the target file already exists, ask the LLM to merge new tests into it.
 * Returns the final code to write (merged or original if file is new).
 */
async function mergeBatchChunk(
  packageDir: string,
  relPath: string,
  existing: string | undefined,
  generatedCodes: string[],
  cfg: Config,
  llmStats: LlmCallStats[],
  signal?: AbortSignal,
  /** Relative path to the source file under test — attached so the LLM can validate imports. */
  sourceFile?: string,
): Promise<string> {
  const { testFramework } = cfg.language;
  const mergeSchema = JSON.stringify(MergeResponse.toJSONSchema(), null, 2);
  const attachments: SendAttachment[] = [];
  const existingSection = existing
    ? `Existing file is attached as \`${relPath}\` AND included inline below. Preserve all existing tests unchanged.\n\n<existing_test_file file="${relPath}">\n${existing}\n</existing_test_file>`
    : "This file does not exist yet. Merge the generated batches below into a single new test file.";
  if (existing) {
    attachments.push({
      type: "virtual-file",
      path: resolve(packageDir, relPath),
      displayName: relPath,
      content: existing,
    });
  }
  attachments.push({
    type: "directory",
    path: resolve(packageDir, dirname(relPath)),
    displayName: `${dirname(relPath)}/`,
  });

  // Attach source file so the LLM can validate imports and symbol names during merge
  let sourceSection = "";
  if (sourceFile) {
    const sourceCode = await tryReadFile(resolve(packageDir, sourceFile));
    if (sourceCode) {
      attachments.push({
        type: "virtual-file",
        path: resolve(packageDir, sourceFile),
        displayName: sourceFile,
        content: sourceCode,
      });
      sourceSection = `The source file under test is attached as \`${sourceFile}\`. Use it to verify that all imports and symbol names in the merged output are correct.`;
    }
  }

  const generatedSection = generatedCodes
    .map((code, index) => {
      const displayName = `generated-batch-${index + 1}${cfg.language.outputExtension}`;
      attachments.push({
        type: "virtual-file",
        path: `merge/${relPath}/generated-batch-${index + 1}${cfg.language.outputExtension}`,
        displayName,
        content: code,
      });
      return `- Generated batch ${index + 1} is attached as \`${displayName}\` AND included inline below:\n\n<generated_batch index="${index + 1}">\n${code}\n</generated_batch>`;
    })
    .join("\n");
  const prompt = await renderPromptTemplate("merge-generated-batches.md", {
    generatedCount: generatedCodes.length,
    testFramework,
    existingSection,
    generatedSection,
    sourceSection,
    jsonSchema: mergeSchema,
  });

  const { content, inputTokens, outputTokens, durationMs } = await send(prompt, {
    model: cfg.llm.fixModel ?? cfg.llm.model,
    signal,
    phase: "merge",
    workingDirectory: packageDir,
    attachments,
    timeoutMs: 3 * 60_000,
  });
  llmStats.push({ inputTokens, outputTokens, durationMs });
  const result = MergeResponse.parse(parseJsonResponse(content));

  // Guard: reject placeholder / stub merges that lost real test content.
  // Only check patterns that are NEW — if the existing file already matches a
  // pattern, don't penalise the merge for faithfully preserving it.
  const code = result.code;
  const placeholderPatterns: RegExp[] = [
    /placeholder.*test/i,
    /could not be reconstructed/i,
    /replace with.*merged/i,
  ];
  if (cfg.runner.placeholderPattern) {
    placeholderPatterns.push(cfg.runner.placeholderPattern);
  }
  const activePatterns = placeholderPatterns.filter(
    (p) => !existing || !p.test(existing),
  );
  if (activePatterns.some((p) => p.test(code))) {
    throw new Error(
      `Merge produced placeholder output for ${relPath} — rejecting to preserve existing tests`,
    );
  }

  // Guard: reject mocking constructs in e2e mode
  const mockViolation = detectMockViolations(code, cfg);
  if (mockViolation) {
    throw new Error(
      `Merge for ${relPath} rejected — ${mockViolation}. Tests must be live integration tests.`,
    );
  }

  return code;
}

async function mergeBatchChunkWithRetry(
  packageDir: string,
  relPath: string,
  existing: string | undefined,
  generatedCodes: string[],
  cfg: Config,
  llmStats: LlmCallStats[],
  signal?: AbortSignal,
  sourceFile?: string,
): Promise<string> {
  try {
    return await mergeBatchChunk(
      packageDir,
      relPath,
      existing,
      generatedCodes,
      cfg,
      llmStats,
      signal,
      sourceFile,
    );
  } catch (error) {
    if (isLlmTimeoutError(error) && generatedCodes.length > 1) {
      const splitAt = Math.ceil(generatedCodes.length / 2);
      const mergedLeft = await mergeBatchChunkWithRetry(
        packageDir,
        relPath,
        existing,
        generatedCodes.slice(0, splitAt),
        cfg,
        llmStats,
        signal,
        sourceFile,
      );
      return mergeBatchChunkWithRetry(
        packageDir,
        relPath,
        mergedLeft,
        generatedCodes.slice(splitAt),
        cfg,
        llmStats,
        signal,
        sourceFile,
      );
    }
    throw error;
  }
}

async function mergeGeneratedBatches(
  packageDir: string,
  relPath: string,
  generatedCodes: string[],
  cfg: Config,
  llmStats: LlmCallStats[],
  signal?: AbortSignal,
  sourceFile?: string,
): Promise<string> {
  const absPath = resolve(packageDir, relPath);
  const existing = await tryReadFile(absPath);
  if (!existing && generatedCodes.length === 1) {
    // Run placeholder guard even on initial batch to avoid poisoning future merges
    const code = generatedCodes[0];
    const placeholderPatterns: RegExp[] = [
      /placeholder.*test/i,
      /could not be reconstructed/i,
      /replace with.*merged/i,
    ];
    if (cfg.runner.placeholderPattern) {
      placeholderPatterns.push(cfg.runner.placeholderPattern);
    }
    if (placeholderPatterns.some((p) => p.test(code))) {
      throw new Error(
        `Initial batch produced placeholder output for ${relPath} — rejecting`,
      );
    }
    // Guard: reject mocking constructs in e2e mode
    const mockViolation = detectMockViolations(code, cfg);
    if (mockViolation) {
      throw new Error(
        `Initial batch for ${relPath} rejected — ${mockViolation}. Tests must be live integration tests.`,
      );
    }
    return code;
  }

  const MAX_NEW_BATCHES_PER_MERGE = 2;
  let current = existing;
  let index = 0;

  while (index < generatedCodes.length) {
    const capacityForNew = current ? MAX_NEW_BATCHES_PER_MERGE - 1 : MAX_NEW_BATCHES_PER_MERGE;
    const take = Math.max(1, capacityForNew);
    const chunk = generatedCodes.slice(index, index + take);
    current = await mergeBatchChunkWithRetry(
      packageDir,
      relPath,
      current,
      chunk,
      cfg,
      llmStats,
      signal,
      sourceFile,
    );
    index += chunk.length;
  }

  if (!current) {
    throw new Error(`Merge produced no output for ${relPath}`);
  }
  return current;
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
  existingTestFile?: string,
  existingTestsSnippet?: string,
  /** Resolved context files (dependencies) for the source under test. */
  contextFiles?: ContextFile[],
): Promise<boolean> {
  const absPath = resolve(packageDir, relPath);
  await mkdir(dirname(absPath), { recursive: true });

  // Snapshot the file before writing, so we can rollback on fix failure
  const snapshot = await tryReadFile(absPath);

  await writeFile(absPath, code, "utf8");

  const maxFix = cfg.loop.fixMaxIterations;
  if (maxFix <= 0) {
    const initial = await runSingleTest(relPath, packageDir, cfg);
    return initial.passed;
  }

  const fixSchema = JSON.stringify(FixResponse.toJSONSchema(), null, 2);

  // Read the source file under test so the LLM can reference actual types/signatures.
  const sourceCode = sourceFile ? await tryReadFile(resolve(packageDir, sourceFile)) : undefined;

  const attachments: SendAttachment[] = [
    buildFocusedFileAttachment(absPath, code, [], relPath, 25),
    {
      type: "virtual-file",
      path: `fix/${relPath}.errors.txt`,
      displayName: `${relPath} test errors`,
      content: "",
    },
  ];
  const sourceSection = sourceCode && sourceFile
    ? `\n## Source Under Test\n\nAttached as \`${sourceFile}\` AND included inline below. Use it to verify constructor signatures, importable symbols, and method names.\n\n<source_code file="${sourceFile}">\n${sourceCode}\n</source_code>\n`
    : "";
  const existingSuiteSection = existingTestsSnippet
    ? `\n## Existing Suite Example\n\nAttached as \`${existingTestFile ?? "existing suite example"}\`.\n`
    : "";
  if (sourceCode && sourceFile) {
    attachments.push(
      buildFocusedFileAttachment(resolve(packageDir, sourceFile), sourceCode, [], sourceFile),
    );
  }
  if (existingTestsSnippet) {
    attachments.push({
      type: "virtual-file",
      path: `fix/${relPath}.existing-suite.txt`,
      displayName: existingTestFile ?? `${relPath} existing suite example`,
      content: existingTestsSnippet,
    });
  }
  // Attach context files (dependencies) so the fix LLM can see imported types/constructors
  const contextFilesAttached: string[] = [];
  if (contextFiles && contextFiles.length > 0) {
    for (const cf of contextFiles) {
      attachments.push({
        type: "virtual-file",
        path: `fix/${cf.path}`,
        displayName: cf.path,
        content: cf.content,
      });
      contextFilesAttached.push(cf.path);
    }
  }
  const contextSection = contextFilesAttached.length > 0
    ? `\n## Context Files (Dependencies)\n\nThe following dependency files are attached for reference: ${contextFilesAttached.map(f => `\`${f}\``).join(", ")}. Use these to verify constructor signatures, class hierarchies, and available methods.\n`
    : "";

  interface FixContext {
    currentCode: string;
    errors: string;
    passed: boolean;
    /** Fingerprint of the previous error to detect repeated identical failures. */
    lastErrorSig?: string;
    /** Number of times the same error signature has appeared consecutively. */
    repeatCount: number;
  }

  const ctx: FixContext = { currentCode: code, errors: "", passed: false, repeatCount: 0 };

  /** Extract a short fingerprint from test errors for repeat detection. */
  function errorSignature(output: string): string {
    // Use the first FAILED/ERROR line + the immediately following exception line
    const lines = output.split("\n");
    const sig: string[] = [];
    for (let i = 0; i < lines.length && sig.length < 3; i++) {
      const l = lines[i].trim();
      if (/^(FAILED|ERROR|E\s)/.test(l) || /Error[:,]/.test(l)) {
        sig.push(l.slice(0, 120));
      }
    }
    return sig.join("|");
  }

  await loop<FixContext>(
    {
      async isTerminal(ctx) {
        await ensureAzureAuth(log);
        const result = await runSingleTest(relPath, packageDir, cfg);
        if (result.passed) {
          ctx.passed = true;
          log("    ✅ Tests pass");
          await deepLog("file_event", "fix_pass", { file: relPath });
          return true;
        }
        ctx.errors = result.output;
        log("    ⚠️  Tests failed — asking LLM to fix");
        // Log first few lines of error for diagnostics
        const errorPreview = result.output.split("\n").slice(0, 5).join("\n");
        log(`        💬 ${errorPreview.replace(/\n/g, "\n        💬 ")}`);

        // Early exit: if the same error repeats 2x in a row, bail — LLM is stuck
        const sig = errorSignature(result.output);
        if (sig && sig === ctx.lastErrorSig) {
          ctx.repeatCount++;
          if (ctx.repeatCount >= 2) {
            log("    🔁 Same error repeated — LLM is stuck, bailing early to save quota");
            await deepLog("file_event", "fix_bail_repeat", { file: relPath, repeatCount: ctx.repeatCount });
            return true; // stop the loop
          }
        } else {
          ctx.repeatCount = 0;
        }
        ctx.lastErrorSig = sig;

        await deepLog("file_event", "fix_fail", {
          file: relPath,
          errorLen: result.output.length,
        });
        return false;
      },

      async act(ctx, iteration) {
        // Escalation: on iteration 2+, add stronger guidance to change approach
        const isE2eMode = cfg.paths.testContextDirs && cfg.paths.testContextDirs.length > 0;
        const escalationSection = iteration >= 2
          ? `\n## ⚠️ ESCALATION (Attempt ${iteration}/${maxFix})\n\nPrevious fix attempt(s) failed with the same errors. You MUST change your approach:\n- If you see ImportError: the symbol does NOT exist. Do not retry the same import — find the correct name in the source file.\n- If you see TypeError about arguments: check the constructor/function signature in the source file and context files. Use ONLY the parameters you see there.\n- If you see AttributeError: the method/attribute does NOT exist on that class. Check the source file for the actual method names.\n${isE2eMode && cfg.runner.e2ePromptInstructions ? "- Do NOT replace live service calls with mocks. These are integration tests.\n- Use the fixtures from the test setup file to get a real client.\n- If a test fails due to service errors, adjust the test inputs or assertions rather than mocking.\n" : "- Consider using mocking to bypass complex constructors instead of instantiating real objects.\n"}`
          : "";
        const e2eSection = isE2eMode && cfg.runner.e2ePromptInstructions
          ? `\n${cfg.runner.e2ePromptInstructions}\n`
          : "";
        const prompt = await renderPromptTemplate("fix-generated-test.md", {
          relPath,
          testFileSection: `Attached as \`${relPath}\` AND included inline below.\n\n<current_test_file file="${relPath}">\n${ctx.currentCode}\n</current_test_file>`,
          sourceSection,
          existingSuiteSection,
          contextSection,
          escalationSection,
          e2eSection,
          errorSection: `\n<test_errors>\n${ctx.errors}\n</test_errors>`,
          jsonSchema: fixSchema,
        });

        attachments[1] = {
          type: "virtual-file",
          path: `fix/${relPath}.errors.txt`,
          displayName: `${relPath} test errors`,
          content: ctx.errors,
        };
        attachments[0] = buildFocusedFileAttachment(
          absPath,
          ctx.currentCode,
          extractReferencedLines(ctx.errors, relPath),
          relPath,
          25,
        );
        if (sourceCode && sourceFile) {
          // Always send the full source so the LLM can see all importable symbols
          attachments[2] = buildFocusedFileAttachment(
            resolve(packageDir, sourceFile),
            sourceCode,
            [],
            sourceFile,
          );
        }

        const { content, inputTokens, outputTokens, durationMs } = await send(prompt, {
          model: cfg.llm.fixModel ?? cfg.llm.model,
          signal,
          phase: "fix",
          workingDirectory: packageDir,
          attachments,
          timeoutMs: 3 * 60_000,
        });
        llmStats.push({ inputTokens, outputTokens, durationMs });
        const result = FixResponse.parse(parseJsonResponse(content));
        ctx.currentCode = result.code;
        await writeFile(absPath, ctx.currentCode, "utf8");
      },
    },
    ctx,
    maxFix,
    signal,
  );

  // Rollback to snapshot if fix loop failed — prevents merge corruption
  if (!ctx.passed && snapshot) {
    await writeFile(absPath, snapshot, "utf8");
    log("    ↩️  Rolled back to pre-batch state");
  }

  return ctx.passed;
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
  const fixSchema = JSON.stringify(IsolationFixResponse.toJSONSchema(), null, 2);
  const maxFix = cfg.loop.fixMaxIterations;

  interface IsoFixContext {
    fileCodes: Map<string, string>;
    errors: string;
    noChanges: boolean;
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

  const ctx: IsoFixContext = { fileCodes, errors: suiteErrors, noChanges: false };

  await loop<IsoFixContext>(
    {
      async isTerminal(ctx) {
        if (ctx.noChanges) {
          await deepLog("phase", "isolation_no_changes", { fileCount: ctx.fileCodes.size });
          throw new Error(
            "Isolation batching found no likely fixes for the remaining full-suite failures",
          );
        }
        await ensureAzureAuth(log);
        const result = await runFullSuite(cfg.runner.command, packageDir, cfg);
        if (result.passed) {
          log("    ✅ Full suite passes");
          await deepLog("phase", "isolation_pass", { fileCount: ctx.fileCodes.size });
          return true;
        }
        ctx.errors = result.output;
        log("    ⚠️  Full suite still failing — asking LLM to fix isolation issues");
        await deepLog("phase", "isolation_fail", {
          fileCount: ctx.fileCodes.size,
          errorLen: result.output.length,
        });
        return false;
      },

      async act(ctx) {
        const inventory = Array.from(ctx.fileCodes.keys())
          .sort()
          .map((path) => `- \`${path}\``)
          .join("\n");
        const batches = buildIsolationBatches(
          ctx.fileCodes,
          ctx.errors,
          Math.max(1, cfg.loop.isolationBatchSize),
        );

        let changedAny = false;

        for (let batchIdx = 0; batchIdx < batches.length; batchIdx++) {
          const batch = batches[batchIdx];
          const attachments: SendAttachment[] = batch.map(([path]) => ({
            type: "file",
            path: resolve(packageDir, path),
            displayName: path,
          }));
          const batchParents = new Set(batch.map(([path]) => dirname(path)));
          if (batchParents.size === 1) {
            attachments.push({
              type: "directory",
              path: resolve(packageDir, Array.from(batchParents)[0]),
              displayName: `${Array.from(batchParents)[0]}/`,
            });
          }
          attachments.push({
            type: "virtual-file",
            path: `isolation/batch-${batchIdx + 1}-errors.txt`,
            displayName: `isolation-errors-${batchIdx + 1}.txt`,
            content: ctx.errors,
          });
          const filesSection = batch.map(([path]) => `- Attached file: \`${path}\``).join("\n");

          const prompt = await renderPromptTemplate("fix-isolation.md", {
            fileCount: ctx.fileCodes.size,
            inventory,
            batchLabel: `${batchIdx + 1}/${batches.length}`,
            batchSize: batch.length,
            filesSection,
            errorsSection: `Attached as \`isolation-errors-${batchIdx + 1}.txt\`.`,
            jsonSchema: fixSchema,
          });

          log(`    🔎 Isolation batch ${batchIdx + 1}/${batches.length} (${batch.length} files)`);
          const { content, inputTokens, outputTokens, durationMs } = await send(prompt, {
            model: cfg.llm.fixModel ?? cfg.llm.model,
            signal,
            phase: "isolation",
            workingDirectory: packageDir,
            attachments,
            timeoutMs: 3 * 60_000,
          });
          llmStats.push({ inputTokens, outputTokens, durationMs });
          const result = IsolationFixResponse.parse(parseJsonResponse(content));

          for (const file of result.files) {
            const absPath = resolve(packageDir, file.path);
            const originalCode = ctx.fileCodes.get(file.path) ?? "";

            // LLM-based validation: ask a cheap model to verify the fix is safe
            const validationPrompt =
              `You are a code review gate. Compare the ORIGINAL and FIXED versions of a test file.\n` +
              `Answer with EXACTLY one JSON object: {"safe": true/false, "reason": "..."}\n\n` +
              `Check these rules:\n` +
              `1. Import statements must NOT be changed (no added, removed, or modified imports).\n` +
              `2. The fix must NOT remove more than half the test functions.\n` +
              `3. The fix must NOT replace test bodies with empty stubs, placeholders, or pass-only code.\n` +
              `4. The fix must NOT delete the entire file content.\n\n` +
              `ORIGINAL (${file.path}):\n` +
              codeFenceFor(file.path) + `\n${originalCode}\n` + "```\n\n" +
              `FIXED:\n` +
              codeFenceFor(file.path) + `\n${file.code}\n` + "```\n\n" +
              `Respond with ONLY the JSON object. First character must be {, last must be }.`;

            try {
              const { content: valContent } = await send(validationPrompt, {
                model: cfg.llm.fixModel ?? cfg.llm.model,
                signal,
                phase: "fix",
                timeoutMs: 3 * 60_000,
              });
              const valResult = JSON.parse(valContent.trim());
              if (valResult.safe === false) {
                log(`    ⛔ Rejected fix for ${file.path}: ${valResult.reason}`);
                continue;
              }
            } catch {
              // If validation fails to parse, accept the fix (don't block on gate failure)
            }

            await writeFile(absPath, file.code, "utf8");
            ctx.fileCodes.set(file.path, file.code);
            changedAny = true;
            log(`    📝 Fixed: ${file.path}`);
          }
          for (const fix of result.fixes) {
            changedAny = true;
            log(`    🔧 ${fix.file}: ${fix.test_name} — ${fix.fix}`);
          }
        }

        ctx.noChanges = !changedAny;
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
  /** Skip coverage measurement if coveragePath already exists. */
  skipMeasureIfCached?: boolean;
  /** Skip full-suite validation & final coverage measurement (faster for model comparison). */
  skipFullSuiteValidation?: boolean;
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
    const { stdout, exitCode } = await execStreaming(`${command} 2>&1`, {
      cwd: packageDir,
      timeout: cfg.runner.timeout,
      maxBuffer: cfg.runner.maxBuffer,
      label: "coverage-run",
    });
    log(tail(stdout, cfg.runner.tailLines));
    if (exitCode !== 0) {
      log("⚠️  Some tests may have failed. Checking coverage anyway...");
    }
  } catch (e) {
    const err = e as { stdout?: string; message?: string };
    if (err.stdout) {
      log(tail(err.stdout, cfg.runner.tailLines));
    }
    log(`⚠️  Test run error: ${err.message?.slice(0, 200) ?? "unknown"}. Checking coverage anyway...`);
  }

  // Run post-test command to ensure coverage report exists (e.g., convert .coverage DB → JSON)
  if (cfg.runner.postTestCommand) {
    log(`\n▶ Post-test: ${cfg.runner.postTestCommand}`);
    try {
      await execAsync(`${cfg.runner.postTestCommand} 2>&1`, {
        cwd: packageDir,
        timeout: 60_000,
      });
      log("    ✅ Post-test command succeeded");
    } catch (e) {
      const err = e as { stdout?: string; stderr?: string };
      log(`    ⚠️  Post-test command failed: ${err.stdout || err.stderr || "unknown error"}`);
    }
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
        test_name: z.string(),
        covered_marker_lines: z.array(z.number()),
        branch_summary: z.string(),
        trigger_strategy: z.string(),
      }),
    )
    .optional(),
  skipped_markers: z
    .array(
      z.object({
        marker_line: z.number(),
        reason: z.string(),
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
 * output file (e.g., `test_init_gaps.<ext>`).
 */
export async function runSinglePass(options: RunOptions): Promise<RunReport> {
  const wallStart = Date.now();
  const cfg = resolveConfig(options.config);
  const { packageDir, dryRun = false } = options;
  const log = options.onProgress ?? console.log;
  const llmStats: LlmCallStats[] = [];
  const generatedFiles: string[] = [];
  const promptCache = await PromptCache.load(packageDir);

  // Default verbose logging so subprocess output is always captured
  if (!_verboseLogPath) {
    const defaultVerbosePath = join(packageDir, ".test-gen-copilot-sdk", "verbose.log");
    await mkdir(join(packageDir, ".test-gen-copilot-sdk"), { recursive: true });
    setVerboseLogPath(defaultVerbosePath);
    log(`📝 Verbose subprocess log: ${defaultVerbosePath}`);
  }

  // Initialise deep logging
  await initDeepLog(resolve(packageDir, ".test-gen-copilot-sdk"));
  await deepLog("phase", "run_config", {
    model: cfg.llm.model,
    fixModel: cfg.llm.fixModel,
    llmConcurrency: cfg.llm.concurrency,
    loopConcurrency: cfg.loop.concurrency,
    gapBatchSize: cfg.loop.gapBatchSize,
    maxGapFiles: cfg.loop.maxGapFiles,
    fixMaxIterations: cfg.loop.fixMaxIterations,
    isolationBatchSize: cfg.loop.isolationBatchSize,
    dryRun,
  });

  configureLlm({ concurrency: cfg.llm.concurrency });

  log("╔══════════════════════════════════════════════════════════════╗");
  log("║  Single-Pass Test Generation                                ║");
  log("╠══════════════════════════════════════════════════════════════╣");
  log(`║  Model:      ${cfg.llm.model}`);
  if (cfg.llm.fixModel) log(`║  Fix model:  ${cfg.llm.fixModel}`);
  log(`║  LLM conc.:  ${cfg.llm.concurrency}`);
  log(`║  Batch size: ${cfg.loop.gapBatchSize} branches per LLM call`);
  log(`║  Max files:  ${cfg.loop.maxGapFiles}`);
  log(`║  Fix iter:   ${cfg.loop.fixMaxIterations} per file`);
  if (cfg.loop.concurrency > 1) log(`║  Parallel:   ${cfg.loop.concurrency} source files`);
  if (dryRun) log("║  Mode:       dry-run (print only, no writes)");
  log(`║  Two-phase:  planner → coder (${cfg.llm.model})`);
  log("╚══════════════════════════════════════════════════════════════╝");

  // ── Step 1: Measure coverage ──
  log("\n━━━ Step 1: Measuring coverage ━━━");
  const coverageAbsPath = resolve(packageDir, cfg.runner.coveragePath);
  const hasCachedCoverage = options.skipMeasureIfCached && (await fileExists(coverageAbsPath));
  if (hasCachedCoverage) {
    log(`    ♻️  Reusing cached ${cfg.runner.coveragePath}`);
  } else {
    await ensureAzureAuth(log);
    await runTests(cfg.runner.command, packageDir, log, cfg);
  }

  let gapsResult: ExtractGapsResult;
  try {
    gapsResult = await extractGaps(packageDir, {
      coveragePath: cfg.runner.coveragePath,
      sourcePrefix: cfg.paths.sourcePrefix,
      sourceExclusions: cfg.paths.sourceExclusions,
      sourceInclusions: cfg.paths.sourceInclusions,
      coverageFormat: cfg.runner.coverageFormat,
    });
  } catch {
    log(`\n❌ ${cfg.runner.coveragePath} not generated.`);
    await promptCache.save();
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
    await promptCache.save();
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

  // ── Step 4: Discover source files ──
  const allSourceFiles = await discoverSourceFiles(packageDir, cfg);
  log(`    📁 ${allSourceFiles.length} source files discovered for context resolution`);

  // ── Step 5: Process each gap file ──
  log("\n━━━ Step 4: Generating tests ━━━");

  // Check quota before expensive generation
  const quota = await checkQuota();
  if (quota) {
    log(`    📊 Quota remaining: ${quota.lowestRemainingPct.toFixed(1)}%`);
    if (quota.belowThreshold) {
      log("    ⚠️  Quota too low — stopping to preserve remaining budget");
      await promptCache.save();
      await stopClient();
      return buildReport(initialBranchCov, initialBranchCov, [], llmStats, wallStart, 0);
    }
  }

  let totalBatches = 0;
  const parallel = cfg.loop.concurrency > 1;

  const promptCtxBase = {
    language: cfg.language,
    testDir: cfg.paths.testDir,
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

    // Per-file quota check to stop mid-generation if budget is exhausted
    const fileQuota = await checkQuota();
    if (fileQuota?.belowThreshold) {
      fileLog(`\n⚠️  Quota low (${fileQuota.lowestRemainingPct.toFixed(1)}%) — skipping ${file}`);
      return 0;
    }

    fileLog(`\n🎯 [${fileIdx + 1}/${ranked.length}] ${file} (${stats.gapCount} gaps)`);
    await deepLog("file_event", "file_start", {
      file,
      fileIdx: fileIdx + 1,
      totalFiles: ranked.length,
      gapCount: stats.gapCount,
    });

    // Get all gaps for this file, merge adjacent branch arcs
    const fileGaps = filterGapsForFile(gapsResult, file);
    const gaps = mergeAdjacentGaps(fileGaps.gaps);
    if (gaps.length === 0) return 0;
    const sourceCode = (await tryReadFile(resolve(packageDir, file))) ?? "";
    const sourceHash = hashText(sourceCode);
    const generationSessionKey = `generate:${file}:${sourceHash}`;

    // Context resolution: ask LLM what files it needs
    fileLog("    🔗 Resolving context...");
    let contextFiles: ContextFile[] = [];
    try {
      const annotated = annotateSource(
        sourceCode,
        gaps,
        commentPrefixFor(cfg.language.outputExtension),
      );
      contextFiles = await resolveContext({
        packageDir,
        sourceFile: file,
        annotatedSource: annotated,
        sourceCode,
        focusLines: gaps.map((gap) => gap.start.line),
        allSourceFiles,
        codeFence: codeFenceFor(cfg.language.outputExtension),
        model: cfg.llm.model,
        sourceHash,
        llmStats,
        cache: promptCache,
        signal: options.signal,
        onProgress: parallel
          ? undefined
          : (tokens) => process.stdout.write(`\r    🔗 Resolving context... (${tokens} tokens)`),
      });
      if (!parallel) process.stdout.write("\n");
      if (contextFiles.length > 0) {
        fileLog(`    ✅ Context: ${contextFiles.map((f) => f.path).join(", ")}`);
      }
    } catch (e) {
      fileLog(`    ⚠️  Context resolution failed: ${(e as Error).message}`);
    }

    // Look up existing tests — prefer testContextDirs if configured, else use coverage-based test map
    let existingTests: string | undefined;
    let testEntries = testMap.get(file);

    if (cfg.paths.testContextDirs && cfg.paths.testContextDirs.length > 0) {
      // Scan configured context directories for the best matching test file
      const sourceBaseName = file.split("/").pop()?.replace(/\.\w+$/, "") ?? "";
      let bestMatch: { path: string; content: string; score: number } | undefined;

      for (const ctxDir of cfg.paths.testContextDirs) {
        const absCtxDir = resolve(packageDir, ctxDir);
        try {
          const ctxFiles = (await readdir(absCtxDir, { recursive: true }))
            .filter((e) => cfg.paths.testExtensions.some((ext) => e.endsWith(ext)))
            .filter((e) => !cfg.paths.specExclusions.some((ex) => e.includes(ex)));
          for (const ctxFile of ctxFiles) {
            const ctxBaseName = ctxFile.split("/").pop()?.replace(/\.\w+$/, "") ?? "";
            // Score by how many source-name segments appear in the test filename
            const srcParts = sourceBaseName.replace(/^_+/, "").split("_");
            const matchCount = srcParts.filter((p) => ctxBaseName.toLowerCase().includes(p.toLowerCase())).length;
            const score = matchCount / srcParts.length;
            if (score > (bestMatch?.score ?? 0)) {
              const content = await tryReadFile(resolve(absCtxDir, ctxFile));
              if (content) {
                bestMatch = { path: join(ctxDir, ctxFile), content, score };
              }
            }
          }
        } catch {
          // Directory doesn't exist or can't be read — skip
        }
      }

      if (bestMatch) {
        const maxLines = 400;
        const testLines = bestMatch.content.split("\n");
        existingTests = testLines.length > maxLines
          ? testLines.slice(0, maxLines).join("\n") + `\n... (truncated at ${maxLines} lines)`
          : bestMatch.content;
        // Synthesize a testEntries-like structure for downstream usage
        testEntries = [{ testFile: bestMatch.path, arcCount: 0 }];
        fileLog(`    📋 Context tests (from testContextDirs): ${bestMatch.path} (${testLines.length} lines, score=${bestMatch.score.toFixed(2)})`);
      } else {
        // No name match — pick the largest e2e test file as a style example
        let fallback: { path: string; content: string } | undefined;
        for (const ctxDir of cfg.paths.testContextDirs) {
          const absCtxDir = resolve(packageDir, ctxDir);
          try {
            const ctxFiles = (await readdir(absCtxDir, { recursive: true }))
              .filter((e) => cfg.paths.testExtensions.some((ext) => e.endsWith(ext)))
              .filter((e) => !cfg.paths.specExclusions.some((ex) => e.includes(ex)))
              .filter((e) => !e.includes("__init__"));
            for (const ctxFile of ctxFiles) {
              const content = await tryReadFile(resolve(absCtxDir, ctxFile));
              if (content && (!fallback || content.length > fallback.content.length)) {
                fallback = { path: join(ctxDir, ctxFile), content };
              }
            }
          } catch { /* skip */ }
        }
        if (fallback) {
          const maxLines = 400;
          const testLines = fallback.content.split("\n");
          existingTests = testLines.length > maxLines
            ? testLines.slice(0, maxLines).join("\n") + `\n... (truncated at ${maxLines} lines)`
            : fallback.content;
          testEntries = [{ testFile: fallback.path, arcCount: 0 }];
          fileLog(`    📋 Context tests (fallback from testContextDirs): ${fallback.path} (${testLines.length} lines)`);
        }
      }
    } else if (testEntries && testEntries.length > 0) {
      const topTestFile = testEntries[0].testFile;
      const testContent = await tryReadFile(resolve(packageDir, topTestFile));
      if (testContent) {
        const maxLines = 220;
        const testLines = testContent.split("\n");
        const testHash = hashText(testContent);
        const cachedSnippet = promptCache.getExistingTests({
          sourceFile: file,
          sourceHash,
          testFile: topTestFile,
          testHash,
          maxLines,
        });
        existingTests =
          cachedSnippet ??
          (testLines.length > maxLines
            ? testLines.slice(0, maxLines).join("\n") + `\n... (truncated at ${maxLines} lines)`
            : testContent);
        if (!cachedSnippet) {
          promptCache.setExistingTests(
            {
              sourceFile: file,
              sourceHash,
              testFile: topTestFile,
              testHash,
              maxLines,
            },
            existingTests,
          );
        }
        fileLog(`    📋 Existing tests: ${topTestFile} (${testLines.length} lines)`);
      }
    }

    const staticPromptChars =
      sourceCode.length +
      (existingTests?.length ?? 0) +
      contextFiles.reduce((sum, item) => sum + item.content.length, 0);

    // Chunk gaps into batches
    let effectiveBatchSize = chooseAdaptiveBatchSize(
      cfg.loop.gapBatchSize,
      gaps.length,
      staticPromptChars,
    );

    // Sort branches by start line (lower lines = core logic, higher priority)
    const sortedGaps = [...gaps].sort((a, b) => a.start.line - b.start.line);

    // Cap batches per file to limit LLM calls
    const maxBatches = cfg.loop.maxBatchesPerFile;
    const initialBatchCount = Math.min(
      Math.ceil(sortedGaps.length / effectiveBatchSize),
      maxBatches,
    );
    const initialSkippedBranches = sortedGaps.length > initialBatchCount * effectiveBatchSize
      ? sortedGaps.length - initialBatchCount * effectiveBatchSize
      : 0;

    fileLog(
      `    📦 ~${initialBatchCount} batch(es) of ≤${effectiveBatchSize} branches` +
        (effectiveBatchSize !== cfg.loop.gapBatchSize ? ` (adaptive from ${cfg.loop.gapBatchSize})` : ""),
    );
    if (initialSkippedBranches > 0) {
      fileLog(
        `    ✂️  Capped to ${maxBatches} batches — ~${initialSkippedBranches} branches skipped`,
      );
    }

    if (!dryRun) {
      // Read test setup/fixtures file content if configured (for e2e mode fixture context)
      let conftestContent: string | undefined;
      if (cfg.paths.conftestPath && cfg.paths.testContextDirs?.length) {
        conftestContent = await tryReadFile(resolve(packageDir, cfg.paths.conftestPath)) ?? undefined;
        if (conftestContent) {
          const conftestName = basename(cfg.paths.conftestPath);
          fileLog(`    📋 Loaded test fixtures: ${conftestName} (${conftestContent.split("\n").length} lines)`);
        }
      }

      const seed = await buildPromptSeed(packageDir, file, {
        ...promptCtxBase,
        sourceCode,
        contextFiles,
        existingTests,
        allGaps: gaps,
        e2eMode: !!(cfg.paths.testContextDirs && cfg.paths.testContextDirs.length > 0),
        conftestContent,
        conftestPath: cfg.paths.conftestPath,
        e2ePromptInstructions: cfg.runner.e2ePromptInstructions,
        plannerApiPrefix: cfg.runner.plannerApiPrefix,
        unitTestMockInstructions: cfg.runner.unitTestMockInstructions,
      });
      fileLog("    🧠 Seeding persistent file session");
      await seedSession({
        prompt: seed.prompt,
        model: cfg.llm.model,
        signal: options.signal,
        sessionKey: generationSessionKey,
        workingDirectory: packageDir,
        phase: "seed",
        attachments: seed.attachments,
      });
    }

    let fileBatches = 0;
    let outputPath: string | undefined;

    // ------------------------------------------------------------------
    // Two-phase generation: planner → coder
    // ------------------------------------------------------------------
    async function generateTwoPhase(
      batch: CoverageGap[],
      label: string,
      batchNumber: number,
    ): Promise<boolean> {
      await compactSessionIfNeeded(generationSessionKey);

      // ── Phase 1: Planner ──
      fileLog(`    🗺️  Phase 1: Planning API calls for ${batch.length} gaps...`);
      const plannerPromptData = buildPlannerPrompt(batch, file, sourceCode, cfg.runner.plannerApiPrefix);

      const plannerAttachments: SendAttachment[] = [...plannerPromptData.attachments];

      try {
        const { content: plannerContent, inputTokens: pIn, outputTokens: pOut, durationMs: pMs } = await send(
          plannerPromptData.prompt,
          {
            model: cfg.llm.model,
            signal: options.signal,
            phase: "generate",
            workingDirectory: packageDir,
            attachments: plannerAttachments,
            sessionKey: generationSessionKey,
            timeoutMs: 3 * 60_000,
            onProgress: parallel
              ? undefined
              : (tokens) => process.stdout.write(`\r    🗺️  Planning... (${tokens} tokens)`),
          },
        );
        llmStats.push({ inputTokens: pIn, outputTokens: pOut, durationMs: pMs });
        if (!parallel) process.stdout.write("\n");

        let plan: PlannerResult[];
        try {
          plan = JSON.parse(plannerContent.trim());
        } catch {
          fileLog(`    ❌ Planner returned invalid JSON, falling back to single-phase`);
          return generateBatchWithRetry(batch, label, batchNumber);
        }

        const reachable = plan.filter((p) => p.api_call !== "UNREACHABLE");
        const unreachable = plan.filter((p) => p.api_call === "UNREACHABLE");
        fileLog(`    🗺️  Plan: ${reachable.length} API calls, ${unreachable.length} unreachable (→ unit tests)`);
        for (const p of reachable) {
          fileLog(`      ✅ ${p.api_call} → L${p.marker_lines.join(", L")}`);
        }
        for (const p of unreachable) {
          fileLog(`      🔧 L${p.marker_lines.join(", L")}: unit test (${p.reasoning})`);
        }

        if (reachable.length === 0 && unreachable.length === 0) {
          fileLog(`    ⏭️  No plan entries — skipping batch`);
          return true;
        }

        // ── Phase 2: Coder ──
        fileLog(`    🤖 Phase 2: Generating tests from plan...`);

        const isE2eMode = !!(cfg.paths.testContextDirs && cfg.paths.testContextDirs.length > 0);
        const e2eInstructions = isE2eMode && cfg.runner.e2ePromptInstructions
          ? cfg.runner.e2ePromptInstructions
          : undefined;

        const coderPromptData = buildCoderPrompt(
          plan,
          cfg.language,
          cfg.paths.testDir,
          cfg.language.outputExtension,
          file,
          sourceCode,
          testEntries?.[0]?.testFile,
          existingTests,
          contextFiles,
          e2eInstructions,
          cfg.runner.unitTestMockInstructions,
        );

        const coderAttachments: SendAttachment[] = [
          ...coderPromptData.attachments,
          ...(existingTests
            ? [
                {
                  type: "virtual-file" as const,
                  path: `coder/${outputPath ?? `batch-${batchNumber}`}.existing-suite.txt`,
                  displayName: testEntries?.[0]?.testFile ?? `${file} existing tests`,
                  content: existingTests,
                },
              ]
            : []),
        ];

        const { content: coderContent, inputTokens: cIn, outputTokens: cOut, durationMs: cMs } = await send(
          coderPromptData.prompt,
          {
            model: cfg.llm.model,
            signal: options.signal,
            phase: "generate",
            workingDirectory: packageDir,
            attachments: coderAttachments.length > 0 ? coderAttachments : undefined,
            sessionKey: generationSessionKey,
            timeoutMs: 3 * 60_000,
            onProgress: parallel
              ? undefined
              : (tokens) => process.stdout.write(`\r    🤖 Generating tests... (${tokens} tokens)`),
          },
        );
        llmStats.push({ inputTokens: cIn, outputTokens: cOut, durationMs: cMs });
        if (!parallel) process.stdout.write("\n");

        const response = SinglePassResponse.parse(parseJsonResponse(coderContent));
        outputPath ??= response.path;

        if (response.analysis) {
          for (const a of response.analysis) {
            fileLog(`      📝 ${a.test_name} → L${a.covered_marker_lines.join(", L")}`);
          }
        }

        fileLog(`    📝 → ${outputPath}`);

        if (!dryRun && outputPath) {
          try {
            const mergedCode = await mergeGeneratedBatches(
              packageDir,
              outputPath,
              [response.code],
              cfg,
              llmStats,
              options.signal,
              file,
            );
            if (!generatedFiles.includes(outputPath)) {
              generatedFiles.push(outputPath);
            }
            fileLog("    🧪 Running fix loop for merged batch output");
            await ensureAzureAuth(fileLog);
            const fixPassed = await writeAndFix(
              packageDir,
              outputPath,
              mergedCode,
              cfg,
              fileLog,
              llmStats,
              options.signal,
              file,
              testEntries?.[0]?.testFile,
              existingTests,
              contextFiles,
            );
          } catch (mergeErr) {
            fileLog(`    ⚠️  Merge/fix error: ${mergeErr}`);
          }
        }

        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        fileLog(`    ❌ Two-phase generation failed: ${msg}`);
        return false;
      }
    }

    async function generateBatchWithRetry(
      batch: CoverageGap[],
      label: string,
      batchNumber: number,
    ): Promise<boolean> {
      // Proactively compact session before each batch to prevent timeouts
      await compactSessionIfNeeded(generationSessionKey);

      const isE2eMode = !!(cfg.paths.testContextDirs && cfg.paths.testContextDirs.length > 0);
      const e2eInstructions = isE2eMode && cfg.runner.e2ePromptInstructions
        ? cfg.runner.e2ePromptInstructions
        : undefined;

      const batchDelta = buildBatchDeltaPrompt(
        batch,
        cfg.language,
        cfg.paths.testDir,
        cfg.language.outputExtension,
        testEntries?.[0]?.testFile,
        file,
        sourceCode,
        existingTests,
        contextFiles,
        e2eInstructions,
      );

      if (dryRun) {
        fileLog("    🤖 [DRY RUN] Would generate tests...");
        fileLog(`    Prompt length: ${batchDelta.prompt.length} chars`);
        return true;
      }

      fileLog("    🤖 Generating tests...");
      const batchAttachments: SendAttachment[] = [
        ...batchDelta.attachments,
        ...(existingTests
          ? [
              {
                type: "virtual-file" as const,
                path: `generate/${outputPath ?? `batch-${batchNumber}`}.existing-suite.txt`,
                displayName: testEntries?.[0]?.testFile ?? `${file} existing tests`,
                content: existingTests,
              },
            ]
          : []),
      ];
      const sendOpts: SendOptions = {
        model: cfg.llm.model,
        signal: options.signal,
        phase: "generate",
        workingDirectory: packageDir,
        attachments: batchAttachments.length > 0 ? batchAttachments : undefined,
        timeoutMs: 3 * 60_000,
        onProgress: parallel
          ? undefined
          : (tokens) => process.stdout.write(`\r    🤖 Generating tests... (${tokens} tokens)`),
      };

      try {
        const { content, inputTokens, outputTokens, durationMs } = await send(batchDelta.prompt, {
          ...sendOpts,
          sessionKey: generationSessionKey,
        });
        llmStats.push({ inputTokens, outputTokens, durationMs });
        if (!parallel) process.stdout.write("\n");

        const response = SinglePassResponse.parse(parseJsonResponse(content));
        outputPath ??= response.path;
        if (response.path !== outputPath) {
          fileLog(`    ⚠️  Ignoring path change from ${outputPath} to ${response.path}`);
        }

        if (response.analysis) {
          for (const a of response.analysis) {
            fileLog(`      📝 ${a.test_name} → L${a.covered_marker_lines.join(", L")}`);
          }
        }
        if (response.skipped_markers) {
          for (const skipped of response.skipped_markers) {
            fileLog(`      ⏭️  L${skipped.marker_line}: ${skipped.reason}`);
          }
        }

        fileLog(`    📝 → ${outputPath}`);

        if (!dryRun && outputPath) {
          try {
            const mergedCode = await mergeGeneratedBatches(
              packageDir,
              outputPath,
              [response.code],
              cfg,
              llmStats,
              options.signal,
              file,
            );
            if (!generatedFiles.includes(outputPath)) {
              generatedFiles.push(outputPath);
            }
            fileLog("    🧪 Running fix loop for merged batch output");
            await ensureAzureAuth(fileLog);
            const fixPassed = await writeAndFix(
              packageDir,
              outputPath,
              mergedCode,
              cfg,
              fileLog,
              llmStats,
              options.signal,
              file,
              testEntries?.[0]?.testFile,
              existingTests,
              contextFiles,
            );
            if (fixPassed && outputPath) {
              // tracked for summary
            }
            return fixPassed;
          } catch (mergeError) {
            fileLog(`    ❌ Merge/fix failed: ${(mergeError as Error).message}`);
            return false;
          }
        }
        return true;
      } catch (error) {
        if (!parallel) process.stdout.write("\n");
        if (isLlmTimeoutError(error) && batch.length > 1) {
          const splitAt = Math.ceil(batch.length / 2);
          fileLog(
            `    ⚠️  Generation timed out for batch ${label}; retrying as ${splitAt}+${batch.length - splitAt} branch sub-batches`,
          );
          const firstPassed = await generateBatchWithRetry(batch.slice(0, splitAt), `${label}.1`, batchNumber);
          const secondPassed = await generateBatchWithRetry(batch.slice(splitAt), `${label}.2`, batchNumber);
          return firstPassed && secondPassed;
        }
        fileLog(`    ❌ Generation failed: ${(error as Error).message}`);
        return false;
      }
    }

    let gapOffset = 0;
    let batchIdx = 0;
    let consecutiveFixFailures = 0;

    while (gapOffset < sortedGaps.length && batchIdx < maxBatches) {
      if (options.signal?.aborted) break;

      // Proactively refresh Azure CLI token if it's about to expire
      await ensureAzureAuth(fileLog);

      const batch = sortedGaps.slice(gapOffset, gapOffset + effectiveBatchSize);
      gapOffset += effectiveBatchSize;
      batchIdx++;
      fileBatches++;

      const remainingGaps = sortedGaps.length - gapOffset;
      const estRemaining = remainingGaps > 0 ? Math.ceil(remainingGaps / effectiveBatchSize) : 0;
      const estTotal = Math.min(batchIdx + estRemaining, maxBatches);

      fileLog(`\n    ── Batch ${batchIdx}/${estTotal} (${batch.length} branches) ──`);
      const passed = await generateTwoPhase(batch, `${batchIdx}/${estTotal}`, batchIdx);

      if (passed) {
        consecutiveFixFailures = 0;
        // Recover batch size on success
        effectiveBatchSize = chooseAdaptiveBatchSize(cfg.loop.gapBatchSize, sortedGaps.length - gapOffset, staticPromptChars);
      } else {
        consecutiveFixFailures++;
        if (consecutiveFixFailures >= 2) {
          effectiveBatchSize = Math.max(3, Math.floor(effectiveBatchSize / 2));
          fileLog(`    📉 Reducing batch size to ${effectiveBatchSize} after ${consecutiveFixFailures} consecutive fix failures`);
        }
        // Bail out after 6 consecutive failures on the same file
        if (consecutiveFixFailures >= 6) {
          fileLog(`    ❌ Bailing out after ${consecutiveFixFailures} consecutive failures — moving to next file`);
          break;
        }
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
      ranked.map(
        ([file, stats], idx) =>
          () =>
            processSourceFile(idx, file, stats),
      ),
      concurrency,
      options.signal,
    );
  }

  // ── Step 6: Full-suite validation & isolation fix ──
  let finalBranchCov = initialBranchCov;
  if (!dryRun && generatedFiles.length > 0 && !options.skipFullSuiteValidation) {
    log("\n━━━ Step 5: Full-suite validation ━━━");
    const suiteResult = await runFullSuite(cfg.runner.command, packageDir, cfg);

    if (suiteResult.passed) {
      log("    ✅ Full suite passes — no isolation issues");
    } else {
      log(`    ⚠️  Full suite has failures — fixing ${generatedFiles.length} generated file(s)...`);
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
    await ensureAzureAuth(log);
    await runTests(cfg.runner.command, packageDir, log, cfg);
    try {
      const finalGaps = await extractGaps(packageDir, {
        coveragePath: cfg.runner.coveragePath,
        sourcePrefix: cfg.paths.sourcePrefix,
        sourceExclusions: cfg.paths.sourceExclusions,
        sourceInclusions: cfg.paths.sourceInclusions,
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

  await promptCache.save();
  await stopClient();
  const llmTelemetry = getLlmTelemetry();
  const phaseModels = Object.entries(llmTelemetry.phaseModels)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, count]) => `${key}×${count}`)
    .join(", ");
  log(
    `\n📡 LLM telemetry: created=${llmTelemetry.sessionsCreated}, resumed=${llmTelemetry.sessionsResumed}, deleted=${llmTelemetry.sessionsDeleted}, compactions=${llmTelemetry.compactionsStarted}/${llmTelemetry.compactionsCompleted}, proactive=${llmTelemetry.proactiveCompactions}, modelSwitches=${llmTelemetry.modelSwitches}, quotaChecks=${llmTelemetry.quotaChecks}${phaseModels ? `, models=[${phaseModels}]` : ""}`,
  );

  log(`\n✅ Done: ${generatedFiles.length} files generated across ${totalBatches} batches`);

  const report = buildReport(
    initialBranchCov,
    finalBranchCov,
    generatedFiles,
    llmStats,
    wallStart,
    totalBatches,
  );

  await deepLog("phase", "run_complete", {
    ...report,
    deepLogPath: getDeepLogPath(),
    llmTelemetry,
  });

  return report;
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
