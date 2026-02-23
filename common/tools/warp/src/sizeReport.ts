// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fsp from "node:fs/promises";
import * as path from "node:path";
import * as zlib from "node:zlib";
import { promisify } from "node:util";
import * as ts from "typescript";
import type { CompileResult } from "./compiler.ts";

const gzipAsync = promisify(zlib.gzip);

/**
 * Per-target size metrics.
 */
export interface TargetSizeMetrics {
  files: number;
  jsLoc: number;
  jsRawBytes: number;
  npmEstBytes: number;
  dtsBytes: number;
}

/**
 * Public API surface metrics.
 */
export interface ApiSurfaceMetrics {
  exportCount: number;
  dtsFiles: number;
}

/**
 * Full size report.
 */
export interface SizeReport {
  targets: Record<string, TargetSizeMetrics>;
  apiSurface: ApiSurfaceMetrics;
}

/**
 * Collect files matching multiple extensions in a single recursive readdir pass.
 * Avoids redundant directory traversal when gathering .js and .d.ts files.
 */
async function collectFilesByExt(
  dir: string,
  extensions: string[],
): Promise<Map<string, string[]>> {
  const result = new Map<string, string[]>();
  for (const ext of extensions) {
    result.set(ext, []);
  }
  try {
    const entries = await fsp.readdir(dir, { withFileTypes: true, recursive: true });
    for (const entry of entries) {
      if (!entry.isFile() || entry.name.endsWith(".map")) continue;
      for (const ext of extensions) {
        if (entry.name.endsWith(ext)) {
          const fullPath = path.join(entry.parentPath ?? entry.path, entry.name);
          result.get(ext)!.push(fullPath);
          break; // matched — don't check remaining extensions
        }
      }
    }
  } catch {
    // directory does not exist
  }
  return result;
}

/**
 * Precompute the character offset of each line start for O(1) position-to-line mapping.
 */
function buildLineStarts(content: string): number[] {
  const starts = [0];
  for (let i = 0; i < content.length; i++) {
    if (content[i] === "\n") starts.push(i + 1);
  }
  return starts;
}

/**
 * Count non-blank, non-comment lines in JS content using the TypeScript
 * scanner for accurate tokenization. This correctly handles comment tokens
 * inside strings and template literals (#4).
 *
 * Uses a linear cursor advance instead of binary search for O(T + L) total
 * instead of O(T × log L), exploiting the scanner's monotonically increasing
 * token positions.
 */
function countJsLoc(content: string): number {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, /* skipTrivia */ false);
  scanner.setText(content);

  const lineStarts = buildLineStarts(content);

  // Track which lines contain at least one non-trivial token
  const codeLines = new Set<number>();
  let lineIdx = 0;
  let token: ts.SyntaxKind;

  while ((token = scanner.scan()) !== ts.SyntaxKind.EndOfFileToken) {
    switch (token) {
      case ts.SyntaxKind.WhitespaceTrivia:
      case ts.SyntaxKind.NewLineTrivia:
      case ts.SyntaxKind.SingleLineCommentTrivia:
      case ts.SyntaxKind.MultiLineCommentTrivia:
        // skip trivia — don't count these as code
        break;
      default: {
        const pos = scanner.getTokenStart();
        // Advance lineIdx forward — tokens arrive in position order
        while (lineIdx + 1 < lineStarts.length && lineStarts[lineIdx + 1] <= pos) {
          lineIdx++;
        }
        codeLines.add(lineIdx);
        break;
      }
    }
  }

  return codeLines.size;
}

/**
 * Compute size metrics for a single target using parallel I/O.
 * Uses a single recursive readdir to collect both .js and .d.ts files,
 * halving the directory traversal cost.
 */
async function computeTargetMetrics(outDir: string): Promise<TargetSizeMetrics> {
  const filesByExt = await collectFilesByExt(outDir, [".js", ".d.ts"]);
  const jsFiles = filesByExt.get(".js")!;
  const dtsFiles = filesByExt.get(".d.ts")!;

  // Process each JS file independently so its buffer can be GC'd once
  // complete, instead of holding all file contents in memory simultaneously.
  const jsMetrics = await Promise.all(
    jsFiles.map(async (f) => {
      const buf = await fsp.readFile(f);
      const loc = countJsLoc(buf.toString("utf-8"));
      const gz = await gzipAsync(buf, { level: 6 });
      return { rawBytes: buf.length, loc, gzBytes: gz.length };
    }),
  );

  let jsLoc = 0;
  let jsRawBytes = 0;
  let npmEstBytes = 0;
  for (const m of jsMetrics) {
    jsLoc += m.loc;
    jsRawBytes += m.rawBytes;
    npmEstBytes += m.gzBytes;
  }

  // Stat all d.ts files in parallel
  const dtsStats = await Promise.all(dtsFiles.map((f) => fsp.stat(f)));
  let dtsBytes = 0;
  for (const s of dtsStats) {
    dtsBytes += s.size;
  }

  return { files: jsFiles.length, jsLoc, jsRawBytes, npmEstBytes, dtsBytes };
}

/**
 * Count exported symbols from .d.ts entry-point files.
 * Uses a single ts.createProgram for all entry files (#12).
 */
async function countExports(dtsEntryFiles: string[]): Promise<ApiSurfaceMetrics> {
  const existingFiles = (
    await Promise.all(
      dtsEntryFiles.map(async (f) => {
        try {
          await fsp.access(f);
          return f;
        } catch {
          return null;
        }
      }),
    )
  ).filter((f): f is string => f !== null);
  if (existingFiles.length === 0) {
    return { exportCount: 0, dtsFiles: 0 };
  }

  const program = ts.createProgram(existingFiles, {
    target: ts.ScriptTarget.ESNext,
    declaration: true,
  });
  const checker = program.getTypeChecker();

  let exportCount = 0;
  for (const entryFile of existingFiles) {
    const sourceFile = program.getSourceFile(entryFile);
    if (!sourceFile) continue;
    const symbol = checker.getSymbolAtLocation(sourceFile);
    if (symbol) {
      exportCount += checker.getExportsOfModule(symbol).length;
    }
  }

  return { exportCount, dtsFiles: existingFiles.length };
}

/**
 * Generate a full size report from compile results (async, parallel I/O).
 */
export async function generateSizeReport(
  results: CompileResult[],
  config: { exports: Record<string, string> },
  packageRoot: string,
): Promise<SizeReport> {
  // Compute all target metrics in parallel
  const entries = await Promise.all(
    results.map(async (result) => {
      const metrics = await computeTargetMetrics(result.outDir);
      return [result.target.name, metrics] as const;
    }),
  );
  const targets: Record<string, TargetSizeMetrics> = Object.fromEntries(entries);

  // Use the first target's output to count API surface
  const firstResult = results[0];
  const dtsEntryFiles: string[] = [];
  if (firstResult) {
    for (const sourcePath of Object.values(config.exports)) {
      if (!sourcePath.endsWith(".ts")) continue;
      const absSource = path.resolve(packageRoot, sourcePath);
      const absRootDir = path.resolve(packageRoot, firstResult.rootDir);
      const absOutDir = path.resolve(packageRoot, firstResult.outDir);
      const relFromRoot = path.relative(absRootDir, absSource);
      const dtsPath = path.join(absOutDir, relFromRoot).replace(/\.ts$/, ".d.ts");
      dtsEntryFiles.push(dtsPath);
    }
  }

  const apiSurface = await countExports(dtsEntryFiles);
  return { targets, apiSurface };
}

/**
 * Format the size report as a table string.
 */
export function formatSizeReport(report: SizeReport): string {
  const lines: string[] = [];

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} kB`;
  };

  const formatNum = (n: number): string => n.toLocaleString();

  // Header
  lines.push(
    `${"Target".padEnd(18)} ${"Files".padStart(7)} ${"JS LOC".padStart(10)} ${"JS raw".padStart(12)} ${"npm est.".padStart(10)} ${"d.ts".padStart(10)}`,
  );
  lines.push("-".repeat(71));

  for (const [name, metrics] of Object.entries(report.targets)) {
    lines.push(
      `${name.padEnd(18)} ${formatNum(metrics.files).padStart(7)} ${formatNum(metrics.jsLoc).padStart(10)} ${formatBytes(metrics.jsRawBytes).padStart(12)} ${formatBytes(metrics.npmEstBytes).padStart(10)} ${formatBytes(metrics.dtsBytes).padStart(10)}`,
    );
  }

  lines.push("");
  lines.push(
    `Public API surface: ${report.apiSurface.exportCount} exports across ${report.apiSurface.dtsFiles} .d.ts files`,
  );

  return lines.join("\n");
}

/**
 * Write warp-size-report.json when in CI.
 */
export async function writeSizeReportJson(report: SizeReport, packageRoot: string): Promise<void> {
  const reportPath = path.join(packageRoot, "warp-size-report.json");
  await fsp.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf-8");
}
