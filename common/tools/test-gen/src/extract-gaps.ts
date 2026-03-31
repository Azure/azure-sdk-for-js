// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * extract-gaps.ts
 *
 * Reads coverage data (Istanbul or coverage.py format) and extracts
 * uncovered code locations in a single pass.
 */

import { resolve, relative, isAbsolute } from "node:path";
import type {
  CoverageGap,
  FileCoverageStats,
  IstanbulFileCoverage,
  CoveragePyFile,
  CoveragePyReport,
  Pos,
} from "./types.ts";
import { tryReadFile } from "./utils.ts";

export interface ExtractGapsResult {
  gaps: CoverageGap[];
  fileStats: Record<string, FileCoverageStats>;
}

export interface ExtractGapsOptions {
  fileFilter?: string;
  coveragePath?: string;
  sourcePrefix?: string;
  sourceExclusions?: string[];
  sourceInclusions?: string[];
  coverageFormat?: "istanbul" | "coveragepy";
}

// ── Shared helpers ──

function isExcluded(path: string, exclusions?: string[]): boolean {
  return !!exclusions?.some((ex) => path.includes(ex));
}

function isIncluded(path: string, inclusions?: string[]): boolean {
  if (!inclusions || inclusions.length === 0) return true;
  return inclusions.some((inc) => path.includes(inc));
}

function pct(covered: number, total: number): string {
  return total ? ((covered / total) * 100).toFixed(1) : "100.0";
}

function countHits(values: Iterable<number>): { covered: number; total: number } {
  let total = 0;
  let covered = 0;
  for (const v of values) {
    total++;
    if (v > 0) covered++;
  }
  return { total, covered };
}

// ── Istanbul parser ──

type CoverageMap = Record<string, IstanbulFileCoverage>;

function extractIstanbulFileGaps(relPath: string, cov: IstanbulFileCoverage): CoverageGap[] {
  const gaps: CoverageGap[] = [];

  const push = (type: CoverageGap["type"], detail: string, loc: { start: Pos; end: Pos }) =>
    gaps.push({ file: relPath, type, detail, start: loc.start, end: loc.end });

  for (const [id, meta] of Object.entries(cov.branchMap)) {
    for (const [idx, hits] of (cov.b[id] ?? []).entries()) {
      if (hits === 0 && meta.locations[idx]) {
        push("branch", `${meta.type} branch (arm ${idx})`, meta.locations[idx]);
      }
    }
  }

  for (const [id, hits] of Object.entries(cov.f)) {
    const meta = cov.fnMap[id];
    if (hits === 0 && meta) {
      push("function", `function \`${meta.name || "(anonymous)"}\``, meta.loc);
    }
  }

  for (const [id, hits] of Object.entries(cov.s)) {
    const loc = cov.statementMap[id];
    if (hits !== 0 || !loc) continue;
    const dominated = gaps.some(
      (g) => g.start.line <= loc.start.line && g.end.line >= loc.end.line,
    );
    if (!dominated) push("statement", "uncovered statement", loc);
  }

  return gaps;
}

function parseIstanbul(
  raw: string,
  packageDir: string,
  sourcePrefix: string,
  fileFilter?: string,
  sourceExclusions?: string[],
): ExtractGapsResult {
  const coverage = JSON.parse(raw) as CoverageMap;
  const allGaps: CoverageGap[] = [];
  const fileStats: Record<string, FileCoverageStats> = {};

  for (const [absPath, fileCov] of Object.entries(coverage)) {
    const relPath = relative(packageDir, absPath);
    if (!relPath.startsWith(sourcePrefix)) continue;
    if (isExcluded(relPath, sourceExclusions)) continue;
    if (fileFilter && relPath !== fileFilter) continue;

    const gaps = extractIstanbulFileGaps(relPath, fileCov);
    allGaps.push(...gaps);

    fileStats[relPath] = {
      branches: countHits(Object.values(fileCov.b).flat()),
      statements: countHits(Object.values(fileCov.s)),
      functions: countHits(Object.values(fileCov.f)),
      gapCount: gaps.length,
    };
  }

  return { gaps: allGaps, fileStats };
}

// ── Coverage.py parser ──

function extractCoveragePyFileGaps(relPath: string, cov: CoveragePyFile): CoverageGap[] {
  const gaps: CoverageGap[] = [];

  if (cov.missing_branches) {
    for (const [fromLine, toLine] of cov.missing_branches) {
      gaps.push({
        file: relPath,
        type: "branch",
        detail: `branch ${fromLine} → ${toLine}`,
        start: { line: fromLine, column: 0 },
        end: { line: toLine, column: 0 },
      });
    }
  }

  for (const line of cov.missing_lines) {
    const dominated = gaps.some((g) => g.start.line <= line && g.end.line >= line);
    if (!dominated) {
      gaps.push({
        file: relPath,
        type: "statement",
        detail: "uncovered statement",
        start: { line, column: 0 },
        end: { line, column: 0 },
      });
    }
  }

  return gaps;
}

function parseCoveragePy(
  raw: string,
  packageDir: string,
  sourcePrefix: string,
  fileFilter?: string,
  sourceExclusions?: string[],
  sourceInclusions?: string[],
): ExtractGapsResult {
  const report = JSON.parse(raw) as CoveragePyReport;
  const allGaps: CoverageGap[] = [];
  const fileStats: Record<string, FileCoverageStats> = {};

  for (const [filePath, fileCov] of Object.entries(report.files)) {
    const relPath = isAbsolute(filePath) ? relative(packageDir, filePath) : filePath;
    if (!relPath.startsWith(sourcePrefix)) continue;
    if (isExcluded(relPath, sourceExclusions)) continue;
    if (!isIncluded(relPath, sourceInclusions)) continue;
    if (fileFilter && relPath !== fileFilter) continue;

    const gaps = extractCoveragePyFileGaps(relPath, fileCov);
    allGaps.push(...gaps);

    const { summary } = fileCov;
    fileStats[relPath] = {
      branches: {
        covered: summary.covered_branches ?? 0,
        total: summary.num_branches ?? 0,
      },
      statements: {
        covered: fileCov.executed_lines.length,
        total: fileCov.executed_lines.length + fileCov.missing_lines.length,
      },
      functions: { covered: 0, total: 0 },
      gapCount: gaps.length,
    };
  }

  return { gaps: allGaps, fileStats };
}

// ── Public API ──

/**
 * Extract coverage gaps and per-file stats in a single pass.
 * Dispatches to the correct parser based on `coverageFormat`.
 */
export async function extractGaps(
  packageDir: string,
  options?: ExtractGapsOptions,
): Promise<ExtractGapsResult> {
  const {
    fileFilter,
    coveragePath = "coverage/coverage-final.json",
    sourcePrefix = "src/",
    sourceExclusions,
    sourceInclusions,
    coverageFormat = "istanbul",
  } = options ?? {};

  const coverageFile = resolve(packageDir, coveragePath);
  const raw = await tryReadFile(coverageFile);

  if (!raw) {
    throw new Error(`Coverage file not found: ${coverageFile}\nRun tests with coverage first.`);
  }

  const result =
    coverageFormat === "coveragepy"
      ? parseCoveragePy(raw, packageDir, sourcePrefix, fileFilter, sourceExclusions, sourceInclusions)
      : parseIstanbul(raw, packageDir, sourcePrefix, fileFilter, sourceExclusions);

  result.gaps.sort((a, b) => a.file.localeCompare(b.file) || a.start.line - b.start.line);
  return result;
}

/** Compute aggregate branch coverage percentage from already-extracted stats. */
export function computeBranchCoverage(fileStats: Record<string, FileCoverageStats>): number {
  let covered = 0;
  let total = 0;
  for (const s of Object.values(fileStats)) {
    covered += s.branches.covered;
    total += s.branches.total;
  }
  return total ? (covered / total) * 100 : 100;
}

/** Filter a full gaps result to a single source file. */
export function filterGapsForFile(result: ExtractGapsResult, file: string): ExtractGapsResult {
  return {
    gaps: result.gaps.filter((g) => g.file === file),
    fileStats: file in result.fileStats ? { [file]: result.fileStats[file] } : {},
  };
}

/** Format gaps as markdown. */
export function formatGaps({ gaps, fileStats }: ExtractGapsResult): string {
  if (gaps.length === 0) {
    return "No uncovered code paths found. Coverage is complete for the targeted files.";
  }

  const ranked = Object.entries(fileStats).sort(([, a], [, b]) => b.gapCount - a.gapCount);
  const lines: string[] = [
    "## Coverage Gaps Summary\n",
    "| File | Gaps | Branch% | Stmt% | Fn% |",
    "|------|------|---------|-------|-----|",
    ...ranked.map(
      ([file, s]) =>
        `| ${file} | ${s.gapCount} | ${pct(s.branches.covered, s.branches.total)}% | ${pct(s.statements.covered, s.statements.total)}% | ${pct(s.functions.covered, s.functions.total)}% |`,
    ),
  ];

  let currentFile = "";
  for (const { file, type, detail, start, end } of gaps) {
    if (file !== currentFile) {
      currentFile = file;
      lines.push(`\n### ${file}`);
    }
    const range =
      start.line === end.line ? `line ${start.line}` : `lines ${start.line}-${end.line}`;
    lines.push(`- UNCOVERED ${type.toUpperCase()}: ${detail} at ${range}`);
  }

  lines.push(`\n**Total: ${gaps.length} uncovered code locations across ${ranked.length} files**`);
  return lines.join("\n");
}
