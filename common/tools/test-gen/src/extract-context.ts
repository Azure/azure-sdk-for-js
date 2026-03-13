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
  conventions: z.string().describe(
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
 * Reads all files in the test directory, separates fixtures from spec files,
 * and sends the contents along with coverage data to the LLM for analysis.
 * The returned string is a markdown section suitable for injection into
 * subsequent test-generation prompts.
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

  // ~4 chars per token is a reasonable approximation
  const MAX_CHARS_PER_FILE = 10_000 * 4;

  // 2. Read all files, separating fixtures from spec files
  const specRelSet = new Set(specFiles.map((f) => relative(testDir, f)));
  const testFiles: { rel: string; content: string; isFixture: boolean }[] = [];

  for (const f of allEntries) {
    const content = await tryReadFile(resolve(testDir, f));
    if (!content) continue;
    const truncated =
      content.length > MAX_CHARS_PER_FILE
        ? content.slice(0, MAX_CHARS_PER_FILE) + "\n# ... (truncated at ~10k token limit)"
        : content;
    testFiles.push({
      rel: join(cfg.paths.testDir, f),
      content: truncated,
      isFixture: !specRelSet.has(f),
    });
  }

  const fixtures = testFiles.filter((f) => f.isFixture);
  const specs = testFiles.filter((f) => !f.isFixture);

  // 5. Build coverage summary
  const coverageLines = Object.entries(gapsResult.fileStats)
    .map(([file, stats]) => {
      const total = stats.branches.total;
      const pct = total > 0 ? ((stats.branches.covered / total) * 100).toFixed(1) : "100.0";
      return `- \`${file}\`: ${pct}% branch coverage (${stats.branches.covered}/${total} branches)${stats.gapCount > 0 ? ` — ${stats.gapCount} uncovered locations` : ""}`;
    })
    .join("\n");

  const overallCov = computeBranchCoverage(gapsResult.fileStats);

  // 6. Build the analysis prompt
  const sections: string[] = [];

  sections.push(
    `You are analyzing an existing ${framework} test suite to extract conventions and patterns.\n` +
      `Your output will be included verbatim in prompts that ask an LLM to generate new tests.\n` +
      `Write it as instructions directed at an LLM, not as documentation for humans.`,
  );

  if (fixtures.length > 0) {
    sections.push("## Fixture & Helper Files\n");
    for (const f of fixtures) {
      sections.push(`**\`${f.rel}\`**\n\n\`\`\`${codeFence}\n${f.content}\n\`\`\``);
    }
  }

  if (specs.length > 0) {
    sections.push("## Existing Test Files\n");
    for (const f of specs) {
      sections.push(`**\`${f.rel}\`**\n\n\`\`\`${codeFence}\n${f.content}\n\`\`\``);
    }
  }

  sections.push(
    `## Current Coverage\n\nOverall branch coverage: ${overallCov.toFixed(1)}%\n\n${coverageLines}`,
  );

  sections.push(
    `## Task

Produce a concise **conventions guide** (under 200 lines) covering:

1. **File Header** — The exact copyright/license header that all test files must start with (extract verbatim from the existing files).
2. **Available Fixtures & Helpers** — List each fixture/helper with what it provides, its scope, and when to use it. Emphasize: "Use these instead of creating ad-hoc mocks or helpers."
3. **Test Organization** — Function-based vs class-based? Naming conventions? How are tests grouped?
4. **Import Conventions** — Standard import patterns from the examples.
5. **Assertion Style** — How assertions are written, what patterns are preferred.
6. **Key Examples** — 2-3 SHORT code snippets (under 10 lines each) showing the most representative test patterns. Demonstrate fixture usage, assertion style, and structure.
7. **Quality Rules** — List these rules that new tests MUST follow:
   - Each test function verifies ONE code path (single responsibility)
   - Assertions verify specific expected values, not just types or existence (BAD: \`assert x is not None\`, GOOD: \`assert x == expected\`)
   - No module-level side effects that persist between tests (no importlib.reload, no un-restored monkey-patching of globals)
   - Prefer existing fixtures over ad-hoc mocks when they provide equivalent functionality`,
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
