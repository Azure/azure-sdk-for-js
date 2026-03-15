// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * extract-test-map.ts
 *
 * Queries a coverage.py `.coverage` SQLite database (created with
 * `--cov-context=test`) to build a mapping from source files to the
 * test files that exercise them.
 *
 * Uses Node.js built-in `node:sqlite` (available in Node 22+).
 * Returns an empty map when the DB is missing or schema lacks context tracking.
 */

import { resolve, relative } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileExists } from "./utils.ts";

export interface TestMapEntry {
  /** Relative path to a test file that exercises the source file. */
  testFile: string;
  /** Number of arcs (branch transitions) this test file contributes. */
  arcCount: number;
}

/**
 * Extract a source → test file mapping from a `.coverage` SQLite database.
 *
 * The `.coverage` database is created by `pytest-cov` with `--cov-context=test`.
 * It contains:
 * - `file` table: (id, path) — absolute source file paths
 * - `context` table: (id, context) — test function identifiers
 * - `arc` table: (file_id, context_id, fromno, tono) — branch transition arcs
 *
 * @param packageDir   Absolute path to the package root.
 * @param coverageDbPath  Path to the `.coverage` SQLite file (relative to packageDir or absolute).
 * @param sourcePrefix  Prefix to filter source files (e.g., "azure/storage/blob/").
 * @returns Map from relative source path → sorted list of test files (most relevant first).
 */
export async function extractTestMap(
  packageDir: string,
  coverageDbPath: string = ".coverage",
  sourcePrefix?: string,
): Promise<Map<string, TestMapEntry[]>> {
  const dbPath = resolve(packageDir, coverageDbPath);
  if (!(await fileExists(dbPath))) {
    return new Map();
  }

  let db: DatabaseSync;
  try {
    db = new DatabaseSync(dbPath, { readOnly: true });
  } catch {
    return new Map();
  }

  try {
    // Verify the schema has context tracking tables
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all() as {
      name: string;
    }[];
    const tableNames = new Set(tables.map((t) => t.name));

    if (!tableNames.has("context") || !tableNames.has("arc") || !tableNames.has("file")) {
      return new Map();
    }

    // Query: for each source file, find which test files contribute arcs
    const rows = db
      .prepare(
        `SELECT f.path AS source_path, c.context AS test_context, COUNT(*) AS arc_count
         FROM arc a
         JOIN file f ON a.file_id = f.id
         JOIN context c ON a.context_id = c.id
         WHERE c.context != ''
         GROUP BY f.path, c.context
         ORDER BY f.path, arc_count DESC`,
      )
      .all() as { source_path: string; test_context: string; arc_count: number }[];

    const result = new Map<string, TestMapEntry[]>();

    for (const row of rows) {
      // Convert absolute source path to relative
      let relSource: string;
      if (row.source_path.startsWith("/")) {
        relSource = relative(packageDir, row.source_path);
      } else {
        relSource = row.source_path;
      }

      // Normalize to posix separators
      relSource = relSource.split("\\").join("/");

      // Apply source prefix filter
      if (sourcePrefix && !relSource.startsWith(sourcePrefix)) {
        continue;
      }

      // Extract test file path from context string
      // Format: "tests/test_blob_client.py::TestClass::test_method|run"
      const testFile = extractTestFilePath(row.test_context);
      if (!testFile) continue;

      if (!result.has(relSource)) {
        result.set(relSource, []);
      }

      // Accumulate arc counts per test file
      const entries = result.get(relSource)!;
      const existing = entries.find((e) => e.testFile === testFile);
      if (existing) {
        existing.arcCount += row.arc_count;
      } else {
        entries.push({ testFile, arcCount: row.arc_count });
      }
    }

    // Sort each file's test list by arc count (most relevant first)
    for (const entries of result.values()) {
      entries.sort((a, b) => b.arcCount - a.arcCount);
    }

    return result;
  } finally {
    db.close();
  }
}

/**
 * Extract the test file path from a coverage.py context string.
 * Examples:
 *   "tests/test_blob_client.py::TestBlobClient::test_create|run" → "tests/test_blob_client.py"
 *   "tests/test_blob_client.py::test_create|run" → "tests/test_blob_client.py"
 *   "" → undefined
 */
function extractTestFilePath(context: string): string | undefined {
  if (!context) return undefined;

  // Remove "|run" or "|setup" suffix
  const base = context.split("|")[0];
  if (!base) return undefined;

  // Extract file path (everything before "::")
  const sep = base.indexOf("::");
  if (sep === -1) return undefined;

  const filePath = base.slice(0, sep);
  // Normalize to posix
  return filePath.split("\\").join("/");
}
