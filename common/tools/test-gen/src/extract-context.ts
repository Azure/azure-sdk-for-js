// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * extract-context.ts
 *
 * One-time LLM analysis of the existing test suite.
 * Produces a concise conventions document that subsequent
 * test-generation prompts include verbatim.
 */

import { readdir } from "node:fs/promises";
import { resolve, relative, join } from "node:path";
import { z } from "zod";
import { send } from "./llm.ts";
import type { SendOptions } from "./llm.ts";
import { tryReadFile } from "./utils.ts";
import { codeFenceFor } from "./config.ts";
import type { Config } from "./config.ts";
import type { ExtractGapsResult } from "./extract-gaps.ts";
import { computeBranchCoverage } from "./extract-gaps.ts";
import type { LlmCallStats } from "./types.ts";

const ContextResponse = z.object({
  conventions: z
    .string()
    .describe(
      "A concise conventions guide formatted as markdown, suitable for direct inclusion in an LLM prompt",
    ),
});

export interface TestContextOptions {
  packageDir: string;
  cfg: Config;
  /** Absolute paths to spec/test files (already filtered by specSuffix + exclusions). */
  specFiles: string[];
  gapsResult: ExtractGapsResult;
  llmStats: LlmCallStats[];
  signal?: AbortSignal;
  onProgress?: (tokens: number) => void;
}

/**
 * Analyze the existing test suite and produce a conventions document.
 *
 * Reads files in the test directory, separates fixtures from spec files,
 * and sends a **sampled** subset (to stay within model token limits) along
 * with coverage data to the LLM for analysis.
 *
 * Called once before the generation loop starts.
 */
export async function extractTestContext(options: TestContextOptions): Promise<string> {
  const { packageDir, cfg, specFiles, gapsResult, llmStats, signal, onProgress } = options;
  const codeFence = codeFenceFor(cfg.language.outputExtension);
  const framework = cfg.language.testFramework;
  const testDir = resolve(packageDir, cfg.paths.testDir);

  // 1. Discover all files in the test directory
  let allEntries: string[];
  try {
    allEntries = (await readdir(testDir, { recursive: true }))
      .filter((e) => cfg.paths.testExtensions.some((ext) => e.endsWith(ext)))
      .sort();
  } catch {
    allEntries = [];
  }

  const MAX_CHARS_PER_FILE = 200 * 80; // ~200 lines at 80 chars
  const MAX_TOTAL_CHARS = 100_000 * 4; // ~100k tokens budget

  // 2. Read all files, separating fixtures from spec files
  const specRelSet = new Set(specFiles.map((f) => relative(testDir, f)));
  const testFiles: { rel: string; content: string; isFixture: boolean; size: number }[] = [];

  for (const f of allEntries) {
    const content = await tryReadFile(resolve(testDir, f));
    if (!content) continue;
    testFiles.push({
      rel: join(cfg.paths.testDir, f),
      content,
      isFixture: !specRelSet.has(f),
      size: content.length,
    });
  }

  const fixtures = testFiles.filter((f) => f.isFixture);
  const specs = testFiles.filter((f) => !f.isFixture);

  // 3. Sample spec files for size diversity (always include fixtures — they're usually small)
  const sampledSpecs = sampleByDiversity(specs, MAX_TOTAL_CHARS, MAX_CHARS_PER_FILE);
  const truncatedFixtures = fixtures.map((f) => ({
    ...f,
    content: truncate(f.content, MAX_CHARS_PER_FILE),
  }));

  // 4. Build coverage summary
  const coverageLines = Object.entries(gapsResult.fileStats)
    .map(([file, stats]) => {
      const total = stats.branches.total;
      const pct = total > 0 ? ((stats.branches.covered / total) * 100).toFixed(1) : "100.0";
      return `- \`${file}\`: ${pct}% branch coverage (${stats.branches.covered}/${total} branches)${stats.gapCount > 0 ? ` — ${stats.gapCount} uncovered locations` : ""}`;
    })
    .join("\n");

  const overallCov = computeBranchCoverage(gapsResult.fileStats);

  // 5. Build the analysis prompt
  const sections: string[] = [];

  sections.push(
    `You are analyzing an existing ${framework} test suite to extract patterns and conventions.\n\n` +
      `Your output will be injected verbatim into prompts that ask an LLM to generate new tests.\n` +
      `Write it as DIRECT INSTRUCTIONS to that LLM — imperative voice, second person.\n` +
      `NOT documentation. NOT a summary. INSTRUCTIONS.`,
  );

  if (truncatedFixtures.length > 0) {
    sections.push("## Fixture & Helper Files\n");
    for (const f of truncatedFixtures) {
      sections.push(`**\`${f.rel}\`**\n\n\`\`\`${codeFence}\n${f.content}\n\`\`\``);
    }
  }

  if (sampledSpecs.length > 0) {
    sections.push(
      `## Sample Test Files (${sampledSpecs.length} of ${specs.length} files, selected for pattern diversity)\n`,
    );
    for (const f of sampledSpecs) {
      const lineCount = f.content.split("\n").length;
      sections.push(
        `**\`${f.rel}\`** (${lineCount} lines)\n\n\`\`\`${codeFence}\n${f.content}\n\`\`\``,
      );
    }
  }

  sections.push(
    `## Current Coverage\n\nOverall branch coverage: ${overallCov.toFixed(1)}%\n\n${coverageLines}`,
  );

  sections.push(
    `## Task

Produce a conventions guide (UNDER 150 lines of markdown) with these exact sections:

### 1. File Header
Extract the EXACT copyright/license header from the existing files. Reproduce it verbatim.

### 2. Imports
List the standard import pattern. Show the exact import lines used across test files.
Identify which imports come from the package under test vs. test utilities vs. stdlib.

### 3. Test Structure
- Class-based or function-based? Show the exact pattern.
- Naming convention for test functions/methods (prefix, casing, separator).
- How are tests grouped (by feature? by method? by scenario?).
- Setup/teardown pattern (fixtures? setUp/tearDown methods? context managers?).

### 4. Available Fixtures & Helpers
For EACH fixture/helper: name, what it provides, scope, usage example.
Emphasize: "Use these instead of creating ad-hoc mocks."

### 5. Assertion Style
Show 2-3 real assertion patterns extracted from the files.
Specify which assertion functions/methods are standard.

### 6. Key Patterns (2-3 code snippets, under 10 lines each)
Pick the most REPRESENTATIVE test patterns. Prioritize:
- A test that uses fixtures correctly
- A test that validates error conditions
- A test that mocks external dependencies

### 7. Mandatory Quality Rules
State these as non-negotiable rules:
- Each test function tests ONE code path
- Assertions verify SPECIFIC expected values (BAD: \`assert x is not None\`; GOOD: \`assert x == 42\`)
- No module-level side effects that persist between tests
- Clean up any resources created during the test`,
  );

  const prompt = sections.join("\n\n");

  const jsonSchema = JSON.stringify(ContextResponse.toJSONSchema(), null, 2);
  const augmented = `${prompt}\n\nRespond with ONLY valid JSON matching this schema — no markdown fences, no explanation, just the raw JSON object:\n${jsonSchema}`;

  const sendOpts: SendOptions = { model: cfg.llm.model, signal, onProgress };
  const { content, inputTokens, outputTokens, durationMs } = await send(augmented, sendOpts);
  llmStats.push({ inputTokens, outputTokens, durationMs });

  const result = ContextResponse.parse(JSON.parse(content));
  return result.conventions;
}

/**
 * Sample test files for size diversity. Picks files from across the size
 * spectrum (small, medium, large) to capture diverse patterns, staying
 * within a total character budget.
 */
function sampleByDiversity(
  files: { rel: string; content: string; size: number }[],
  maxTotalChars: number,
  maxPerFile: number,
): { rel: string; content: string }[] {
  if (files.length === 0) return [];

  // Sort by size to pick from different quartiles
  const sorted = [...files].sort((a, b) => a.size - b.size);

  // Pick indices spread across the size distribution
  const indices: number[] = [];
  const n = sorted.length;
  if (n <= 6) {
    // Small set — take all
    for (let i = 0; i < n; i++) indices.push(i);
  } else {
    // Pick 6 files: smallest, 25th percentile, median-1, median, 75th percentile, largest
    const picks = [
      0,
      Math.floor(n * 0.25),
      Math.floor(n * 0.5) - 1,
      Math.floor(n * 0.5),
      Math.floor(n * 0.75),
      n - 1,
    ];
    const seen = new Set<number>();
    for (const p of picks) {
      const idx = Math.max(0, Math.min(p, n - 1));
      if (!seen.has(idx)) {
        seen.add(idx);
        indices.push(idx);
      }
    }
  }

  // Truncate and accumulate within budget
  const result: { rel: string; content: string }[] = [];
  let totalChars = 0;

  for (const idx of indices) {
    const file = sorted[idx];
    const truncated = truncate(file.content, maxPerFile);
    if (totalChars + truncated.length > maxTotalChars) break;
    totalChars += truncated.length;
    result.push({ rel: file.rel, content: truncated });
  }

  return result;
}

function truncate(content: string, maxChars: number): string {
  if (content.length <= maxChars) return content;
  return content.slice(0, maxChars) + "\n... (truncated)";
}
