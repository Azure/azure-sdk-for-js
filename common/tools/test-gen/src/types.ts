// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Shared types for the test-gen tool.
 */

/** A line:column position in a source file. */
export interface Pos {
  line: number;
  column: number;
}

/** A single uncovered code location from Istanbul coverage data. */
export interface CoverageGap {
  file: string;
  type: "branch" | "function" | "statement";
  detail: string;
  start: Pos;
  end: Pos;
}

/** Per-file coverage statistics (raw numbers — format at output time). */
export interface FileCoverageStats {
  branches: { covered: number; total: number };
  statements: { covered: number; total: number };
  functions: { covered: number; total: number };
  gapCount: number;
}

/** Istanbul coverage-final.json shape for a single file. */
export interface IstanbulFileCoverage {
  branchMap: Record<
    string,
    {
      type: string;
      locations: Array<{ start: Pos; end: Pos }>;
    }
  >;
  b: Record<string, number[]>;
  fnMap: Record<string, { name: string; loc: { start: Pos; end: Pos } }>;
  f: Record<string, number>;
  statementMap: Record<string, { start: Pos; end: Pos }>;
  s: Record<string, number>;
}

/** Coverage.py JSON report shape for a single file. */
export interface CoveragePyFile {
  executed_lines: number[];
  missing_lines: number[];
  excluded_lines: number[];
  summary: {
    covered_lines: number;
    num_statements: number;
    percent_covered: number;
    missing_lines: number;
    excluded_lines: number;
    num_branches?: number;
    covered_branches?: number;
    missing_branches?: number;
  };
  executed_branches?: [number, number][];
  missing_branches?: [number, number][];
}

/** Coverage.py JSON report top-level shape. */
export interface CoveragePyReport {
  meta: Record<string, unknown>;
  files: Record<string, CoveragePyFile>;
}

/** Token and timing stats for a single LLM call. */
export interface LlmCallStats {
  inputTokens: number;
  outputTokens: number;
  durationMs: number;
}

/** Aggregate stats returned from a full runSinglePass() execution. */
export interface RunReport {
  initialBranchCoverage: number;
  finalBranchCoverage: number;
  generatedFiles: string[];
  totalInputTokens: number;
  totalOutputTokens: number;
  totalDurationMs: number;
  /** Wall-clock time for the entire runSinglePass() execution. */
  wallClockMs: number;
  llmCalls: number;
  iterations: number;
}
