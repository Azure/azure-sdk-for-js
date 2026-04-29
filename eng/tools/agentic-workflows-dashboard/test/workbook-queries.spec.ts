/**
 * Live integration tests for workbook KQL queries.
 * These tests validate that all dashboard queries execute without errors.
 *
 * Run with: npx vitest run test/workbook-queries.spec.ts
 * Requires: Azure CLI logged in
 */

import { describe, it, expect, beforeAll } from "vitest";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { join } from "path";

const WORKSPACE_ID = "70a97f54-c975-4850-a078-2977271f3a19";

interface QueryInfo {
  name: string;
  title: string;
  query: string;
  lineNumber: number;
}

// Extract queries from Bicep file
function extractQueriesFromBicep(): QueryInfo[] {
  const bicepPath = join(__dirname, "../infra/main.bicep");
  const content = readFileSync(bicepPath, "utf-8");
  const lines = content.split("\n");
  const queries: QueryInfo[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match query: '...' patterns (single-line queries only, for workbook)
    // Skip triple-quoted queries (used by alert rules) - they start with '''
    const queryMatch = line.match(/^\s*query:\s*'([^'].*[^'])'\s*$/);
    if (!queryMatch) continue;

    const query = queryMatch[1];

    // Skip dropdown/parameter queries
    if (query.includes("distinct Repository") || query.includes("distinct WorkflowName")) {
      continue;
    }
    
    // Skip non-workbook queries (e.g., alert rules use ContainerAppConsoleLogs_CL)
    if (query.includes("ContainerAppConsoleLogs")) {
      continue;
    }

    // Look backwards for title and name
    let title = "";
    let name = "";
    for (let j = i - 1; j >= Math.max(0, i - 15); j--) {
      const titleMatch = lines[j].match(/title:\s*'([^']+)'/);
      const nameMatch = lines[j].match(/^\s*name:\s*'([^']+)'/);
      if (titleMatch && !title) {
        title = titleMatch[1];
      }
      if (nameMatch && !name) {
        name = nameMatch[1];
      }
      if (title && name) break;
    }

    queries.push({
      name: name || `query_line_${i}`,
      title: title || name || `Query at line ${i}`,
      query,
      lineNumber: i + 1,
    });
  }

  return queries;
}

// Convert workbook query to CLI-testable query
function sanitizeQueryForCLI(query: string): string {
  return (
    query
      // Replace {Repository} parameter with empty dynamic (matches all)
      .replace(/let repos = dynamic\(\[\{Repository\}\]\);\s*/g, "")
      .replace(/\s*\|\s*where array_length\(repos\) == 0 or Repository in \(repos\)/g, "")
      // Replace {TimeRange} with a default time filter
      .replace(/\{TimeRange\}/g, "> ago(30d)")
      // Clean up any double pipes
      .replace(/\|\s*\|/g, "|")
      .trim()
  );
}

// Run a KQL query against the workspace
function runQuery(query: string): { success: boolean; error?: string; duration?: number } {
  const start = Date.now();
  try {
    // Escape single quotes for shell
    const escapedQuery = query.replace(/'/g, "'\"'\"'");
    const cmd = `az monitor log-analytics query --workspace "${WORKSPACE_ID}" --analytics-query '${escapedQuery}' -o json 2>&1`;

    const result = execSync(cmd, { encoding: "utf-8", timeout: 60000 });

    // Check for error responses
    if (result.includes("BadArgumentError") || result.includes("SemanticError") || result.includes("SyntaxError")) {
      // Extract error message
      const errorMatch = result.match(/"message":\s*"([^"]+)"/);
      return {
        success: false,
        error: errorMatch ? errorMatch[1] : result.slice(0, 500),
        duration: Date.now() - start,
      };
    }

    return { success: true, duration: Date.now() - start };
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; message?: string };
    const output = err.stdout || err.stderr || err.message || String(error);
    return {
      success: false,
      error: output.slice(0, 500),
      duration: Date.now() - start,
    };
  }
}

describe("Workbook KQL Queries", () => {
  let queries: QueryInfo[] = [];

  beforeAll(() => {
    queries = extractQueriesFromBicep();
    console.log(`\nExtracted ${queries.length} queries from Bicep:`);
    queries.forEach((q) => console.log(`  - ${q.title} (${q.name})`));
  });

  it("should extract queries from Bicep", () => {
    expect(queries.length).toBeGreaterThan(10);
  });

  it("should connect to workspace", () => {
    const result = runQuery("WorkflowRuns_CL | take 1 | count");
    expect(result.success, `Connection failed: ${result.error}`).toBe(true);
  });

  it("all queries should execute without errors", () => {
    const failures: string[] = [];

    for (const q of queries) {
      const sanitized = sanitizeQueryForCLI(q.query);
      const result = runQuery(sanitized);

      if (!result.success) {
        failures.push(`\n❌ ${q.title} (line ${q.lineNumber}):\n   Error: ${result.error}\n   Query: ${sanitized.slice(0, 200)}...`);
      } else {
        console.log(`✓ ${q.title} (${result.duration}ms)`);
      }
    }

    if (failures.length > 0) {
      console.error(`\n${failures.length} queries failed:${failures.join("\n")}`);
    }

    expect(failures, `${failures.length} queries failed`).toHaveLength(0);
  });
});
