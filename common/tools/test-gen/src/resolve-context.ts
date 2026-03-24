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
import type { SendAttachment, SendOptions } from "./llm.ts";
import { tryReadFile } from "./utils.ts";
import type { LlmCallStats } from "./types.ts";
import { renderPromptTemplate } from "./prompt-templates.ts";
import type { PromptCache } from "./prompt-cache.ts";
import { hashText } from "./prompt-cache.ts";
import { parseJsonResponse } from "./parse-json-response.ts";

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
  /** Original source code (without markers). */
  sourceCode: string;
  /** Source line numbers to focus on for selection attachments. */
  focusLines: number[];
  /** All source file paths in the project (relative). */
  allSourceFiles: string[];
  /** Code fence language tag. */
  codeFence: string;
  /** LLM model name. */
  model: string;
  /** Stable hash of the source file content under test. */
  sourceHash: string;
  /** Max lines per context file to include. */
  maxLinesPerFile?: number;
  /** Max number of context files to return. */
  maxFiles?: number;
  /** LLM call stats accumulator. */
  llmStats: LlmCallStats[];
  /** Optional persistent cache for resolved context selections. */
  cache?: PromptCache;
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
    sourceCode,
    allSourceFiles,
    codeFence,
    model,
    sourceHash,
    maxLinesPerFile = 200,
    maxFiles = 8,
    llmStats,
    cache,
    signal,
    onProgress,
  } = options;

  const fileList = allSourceFiles
    .filter((f) => f !== sourceFile)
    .map((f) => `- \`${f}\``)
    .join("\n");
  const fileListHash = hashText(fileList);

  const cachedSelection = cache?.getContextResolution({
    sourceFile,
    sourceHash,
    fileListHash,
    model,
    maxFiles,
  });
  if (cachedSelection) {
    return loadContextFiles(packageDir, cachedSelection, maxLinesPerFile);
  }

  const jsonSchema = JSON.stringify(ContextResolutionResponse.toJSONSchema(), null, 2);

  const attachments: SendAttachment[] = [
    // Full source file so the LLM can see all imports and symbols
    {
      type: "virtual-file",
      path: `resolve-context/${sourceFile}.full.${codeFence}`,
      displayName: `${sourceFile} (full source)`,
      content: sourceCode,
    },
    {
      type: "virtual-file",
      path: "resolve-context/source-file-inventory.txt",
      displayName: "source-file-inventory.txt",
      content: fileList,
    },
  ];

  const prompt = await renderPromptTemplate("resolve-context.md", {
    sourceFile,
    sourceSection: `Attached as \`${sourceFile} (full source)\`.`,
    fileInventorySection: "Attached as `source-file-inventory.txt`.",
    maxFiles,
    jsonSchema,
  });

  const sendOpts: SendOptions = {
    model,
    signal,
    onProgress,
    phase: "resolve",
    workingDirectory: packageDir,
    attachments,
  };
  const { content, inputTokens, outputTokens, durationMs } = await send(prompt, sendOpts);
  llmStats.push({ inputTokens, outputTokens, durationMs });

  const parsed = ContextResolutionResponse.parse(parseJsonResponse(content));
  const selectedFiles = parsed.files.slice(0, maxFiles);
  cache?.setContextResolution(
    {
      sourceFile,
      sourceHash,
      fileListHash,
      model,
      maxFiles,
    },
    selectedFiles,
  );

  return loadContextFiles(packageDir, selectedFiles, maxLinesPerFile);
}

async function loadContextFiles(
  packageDir: string,
  entries: Array<{ path: string; reason: string }>,
  maxLinesPerFile: number,
): Promise<ContextFile[]> {
  // Read requested files, validate they exist, truncate
  const results: ContextFile[] = [];
  for (const entry of entries) {
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
