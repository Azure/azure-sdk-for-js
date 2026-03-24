// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * deep-log.ts
 *
 * Structured JSONL logging for every LLM call, phase transition,
 * and significant runtime event.  Each entry is appended as a single
 * JSON line to `<logDir>/test-gen-deep.jsonl`.
 */

import { appendFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

/** A single structured log entry. */
export interface LogEntry {
  /** ISO-8601 timestamp. */
  ts: string;
  /** Monotonic wall-clock ms since logger creation. */
  elapsed: number;
  /** Event category. */
  cat:
    | "llm_call"
    | "phase"
    | "file_event"
    | "error"
    | "quota"
    | "compaction"
    | "session"
    | "fleet"
    | "metric";
  /** Short event name for filtering. */
  event: string;
  /** Free-form payload — serialised as-is. */
  data: Record<string, unknown>;
}

let logPath: string | undefined;
let t0 = Date.now();

/**
 * Initialise the deep logger.  Call once at the start of a run.
 * @param logDir  Directory to write `test-gen-deep.jsonl` into (created if missing).
 */
export async function initDeepLog(logDir: string): Promise<void> {
  await mkdir(logDir, { recursive: true });
  logPath = join(logDir, "test-gen-deep.jsonl");
  t0 = Date.now();
  // Write a fresh header line so we can tell runs apart
  await writeFile(
    logPath,
    JSON.stringify({
      ts: new Date().toISOString(),
      elapsed: 0,
      cat: "metric",
      event: "run_start",
      data: { logPath },
    }) + "\n",
    "utf8",
  );
}

/** Append a structured entry.  No-op if `initDeepLog` was never called. */
export async function deepLog(
  cat: LogEntry["cat"],
  event: string,
  data: Record<string, unknown>,
): Promise<void> {
  if (!logPath) return;
  const entry: LogEntry = {
    ts: new Date().toISOString(),
    elapsed: Date.now() - t0,
    cat,
    event,
    data,
  };
  try {
    await appendFile(logPath, JSON.stringify(entry) + "\n", "utf8");
  } catch {
    // best-effort — never crash the pipeline over logging
  }
}

/** Return the current log file path (or undefined). */
export function getDeepLogPath(): string | undefined {
  return logPath;
}
