// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * resolve-context.ts
 *
 * LLM-driven context resolution: given a source file with uncovered branches,
 * asks the LLM which other project files it needs to write correct tests.
 * Language-agnostic — the LLM reads import syntax natively.
 */

import { resolve } from "node:path";
import { z } from "zod";
import { send } from "./llm.ts";
import type { SendOptions } from "./llm.ts";
import { tryReadFile } from "./utils.ts";
import type { LlmCallStats } from "./types.ts";

export interface ContextFile {
  /** Relative path to the file. */
  path: string;
  /** Truncated file content. */
  content: string;
  /** LLM's reason for requesting this file. */
  reason: string;
}

export interface ResolveContextOptions {
  /** Absolute path to the package root. */
  packageDir: string;
  /** Relative path to the source file under test. */
  sourceFile: string;
  /** Annotated source code (with ⚠️ markers). */
  annotatedSource: string;
  /** All source file paths in the project (relative). */
  allSourceFiles: string[];
  /** Code fence language tag. */
  codeFence: string;
  /** LLM model name. */
  model: string;
  /** Max lines per context file to include. */
  maxLinesPerFile?: number;
  /** Max number of context files to return. */
  maxFiles?: number;
  /** LLM call stats accumulator. */
  llmStats: LlmCallStats[];
  signal?: AbortSignal;
  onProgress?: (tokens: number) => void;
}

const ContextResolutionResponse = z.object({
  files: z.array(
    z.object({
      path: z.string().describe("Relative path to the file"),
      reason: z.string().describe("Why this file is needed for test generation"),
    }),
  ),
});

/**
 * Ask the LLM which project files it needs as context to write tests for
 * the uncovered branches in a source file.
 *
 * Results should be cached per source file — all batches share the same context.
 */
export async function resolveContext(options: ResolveContextOptions): Promise<ContextFile[]> {
  const {
    packageDir,
    sourceFile,
    annotatedSource,
    allSourceFiles,
    codeFence,
    model,
    maxLinesPerFile = 200,
    maxFiles = 8,
    llmStats,
    signal,
    onProgress,
  } = options;

  const fileList = allSourceFiles
    .filter((f) => f !== sourceFile)
    .map((f) => `- \`${f}\``)
    .join("\n");

  const jsonSchema = JSON.stringify(ContextResolutionResponse.toJSONSchema(), null, 2);

  const prompt = `You are preparing to write tests for a source file. Before generating tests, you need to
identify which OTHER source files contain information necessary to construct correct test inputs.

## Source File: \`${sourceFile}\`

\`\`\`${codeFence}
${annotatedSource}
\`\`\`

Lines marked with ⚠️ UNCOVERED are the branches that need test coverage.

## All Source Files in Project

${fileList}

## Task

Identify which files from the list above I should include as context when generating tests
for the ⚠️ UNCOVERED branches. Consider:

1. **Imported modules** — files this source directly imports from (types, helpers, constants)
2. **Type definitions** — files containing classes/types used as parameters or return values in uncovered branches
3. **Factory functions / constructors** — files that show how to create instances needed as test inputs
4. **Callers** — files that call the functions containing uncovered branches (shows realistic usage patterns)

Do NOT include:
- Test files (those are provided separately)
- Unrelated source files that share no dependency with the uncovered code
- The source file itself

Return at most ${maxFiles} files. Fewer is better — only include files that are genuinely necessary.

Respond with ONLY valid JSON matching this schema — no markdown fences, no explanation, just the raw JSON object:
${jsonSchema}`;

  const sendOpts: SendOptions = { model, signal, onProgress };
  const { content, inputTokens, outputTokens, durationMs } = await send(prompt, sendOpts);
  llmStats.push({ inputTokens, outputTokens, durationMs });

  const parsed = ContextResolutionResponse.parse(JSON.parse(content));

  // Read requested files, validate they exist, truncate
  const results: ContextFile[] = [];
  for (const entry of parsed.files.slice(0, maxFiles)) {
    const absPath = resolve(packageDir, entry.path);
    const fileContent = await tryReadFile(absPath);
    if (!fileContent) continue;

    const lines = fileContent.split("\n");
    const truncated =
      lines.length > maxLinesPerFile
        ? lines.slice(0, maxLinesPerFile).join("\n") +
          `\n... (truncated at ${maxLinesPerFile} lines)`
        : fileContent;

    results.push({
      path: entry.path,
      content: truncated,
      reason: entry.reason,
    });
  }

  return results;
}
