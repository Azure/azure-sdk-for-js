// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * build-prompt.ts
 *
 * Builds the seed and batch-delta prompts used by persistent generation sessions.
 */

import { resolve } from "node:path";
import type { CoverageGap } from "./types.ts";
import { annotateSource, commentPrefixFor } from "./annotate-source.ts";
import type { ContextFile } from "./resolve-context.ts";
import { tryReadFile } from "./utils.ts";
import { defaults } from "./config.ts";
import type { LanguageConfig } from "./config.ts";
import type { SendAttachment } from "./llm.ts";
import { buildAnnotatedSourceSelectionAttachment } from "./attachment-helpers.ts";
export interface PromptSeedContext {
  /** Source file content, when the caller already has it loaded. */
  sourceCode?: string;
  /** Language settings for prompts and code fences. */
  language?: LanguageConfig;
  /** Test directory name (e.g., "test") for output path instructions. */
  testDir?: string;
  /** Context files identified by LLM context resolution. */
  contextFiles?: ContextFile[];
  /** Content of existing test files that exercise the source under test. */
  existingTests?: string;
  /** All uncovered gaps for the current source file. */
  allGaps: CoverageGap[];
}

export interface PreparedPrompt {
  prompt: string;
  attachments?: SendAttachment[];
}

export async function buildPromptSeed(
  packageDir: string,
  sourceFile: string,
  ctx: PromptSeedContext,
): Promise<PreparedPrompt> {
  const lang = ctx.language ?? defaults.language;
  const testDir = ctx.testDir ?? defaults.paths.testDir;
  const sourceCode = ctx.sourceCode
    ? await Promise.resolve(ctx.sourceCode)
    : await tryReadFile(resolve(packageDir, sourceFile));

  if (!sourceCode) throw new Error(`Source file not found: ${resolve(packageDir, sourceFile)}`);

  const stem = sourceFile
    .split("/")
    .pop()!
    .replace(/\.[^.]+$/, "")
    .replace(/^_+/, "");
  const comment = commentPrefixFor(lang.outputExtension);
  const annotated = annotateSource(sourceCode, ctx.allGaps, comment);
  const attachments: SendAttachment[] = [
    // Full source file so the LLM sees ALL importable symbols from the start
    {
      type: "virtual-file",
      path: `seed/${sourceFile}`,
      displayName: `${sourceFile} (full source)`,
      content: sourceCode,
    },
    // Annotated excerpt highlighting uncovered branches
    buildAnnotatedSourceSelectionAttachment(
      sourceFile,
      sourceCode,
      annotated,
      ctx.allGaps,
      `${sourceFile} (annotated excerpt)`,
    ),
  ];

  const contextLines =
    ctx.contextFiles && ctx.contextFiles.length > 0
      ? ctx.contextFiles.map((f, index) => {
          const attachmentPath = `seed/context/${String(index + 1).padStart(2, "0")}-${f.path}`;
          attachments.push({
            type: "virtual-file",
            path: attachmentPath,
            displayName: f.path,
            content: f.content,
          });
          return `- \`${f.path}\` — ${f.reason} (attached as \`${f.path}\`)`;
        })
      : [];

  if (ctx.existingTests) {
    attachments.push({
      type: "virtual-file",
      path: `seed/existing-tests/test_${stem}_existing${lang.outputExtension}`,
      displayName: `existing-tests-${stem}${lang.outputExtension}`,
      content: ctx.existingTests,
    });
  }

  return {
    prompt: [
      `You are writing ${lang.testFramework} tests for \`${sourceFile}\`.`,
      "Persist the attached source-under-test context for later batch prompts in this session.",
      "",
      "## Attached Source Files",
      `- **Full source**: \`${sourceFile} (full source)\` — contains ALL importable symbols. Only import names that are defined in this file.`,
      `- **Annotated excerpt**: \`${sourceFile} (annotated excerpt)\` — shows which branches need coverage with markers.`,
      "",
      "The attached existing-test example, when present, is authoritative for file structure, helper usage, fixtures, decorators, imports, and naming.",
      "Do NOT invent fixtures, decorators, helper functions, imports, private symbols, or test scaffolding that are not visible in the attached source, context files, or existing tests.",
      "Do NOT write smoke tests that only import modules, inspect symbols, or assert generic presence. Write behavior tests for the uncovered branches.",
      "",
      "## Test Framework & Assertion Style",
      `Use ${lang.testFramework} as the test framework.`,
      "Every assertion must check a CONCRETE value or specific exception:",
      "- GOOD: assertEquals(result, 42), assert result == expected_value, expect(result).toBe(42)",
      "- GOOD: assertThrows(ExactType), pytest.raises(ExactType), expect(...).toThrow(ExactType)",
      "- BAD: assert result is not None, assertTrue(result), expect(result).toBeTruthy()",
      "Match the assertion style shown in existing tests when available.",
      "",
      "Attached artifacts:",
      `- Annotated source excerpt for \`${sourceFile}\` with all current uncovered markers`,
      ...(contextLines.length > 0 ? ["- Context files:", ...contextLines] : []),
      ...(ctx.existingTests
        ? [
            "- Existing test snippet for this source file. Match its structure, helpers, setup flow, and assertion style exactly.",
          ]
        : []),
      "",
      `The generated file path should start with \`${testDir}/test_${stem}_gaps.${lang.outputExtension.replace(".", "")}\`.`,
      "Acknowledge with ONLY: OK",
    ]
      .filter(Boolean)
      .join("\n"),
    attachments,
  };
}

export function buildBatchDeltaPrompt(
  gaps: CoverageGap[],
  lang: LanguageConfig,
  testDir: string,
  outputExtension: string,
  existingTestFile?: string,
  sourceFile?: string,
  sourceCode?: string,
  existingTestPatterns?: string,
  contextFiles?: ContextFile[],
): { prompt: string; attachments: SendAttachment[] } {
  const markerLines = gaps.map((gap) => gap.start.line).join(", ");
  const markerSummaries = gaps
    .map((gap) => `- L${gap.start.line}-${gap.end.line} [${gap.type}] ${gap.detail}`)
    .join("\n");
  const schema = `{
  "path": "${testDir}/test_<stem>_gaps.${outputExtension.replace(".", "")}",
  "code": "... complete test file content ...",
  "analysis": [
    {
      "test_name": "test_name_here",
      "covered_marker_lines": [${gaps[0]?.start.line ?? 0}],
      "branch_summary": "what this test covers",
      "trigger_strategy": "how the test triggers the covered branches"
    }
  ],
  "skipped_markers": [
    {
      "marker_line": ${gaps[0]?.start.line ?? 0},
      "reason": "brief justification"
    }
  ]
}`;

  const attachments: SendAttachment[] = [];
  if (sourceCode && sourceFile) {
    attachments.push({
      type: "virtual-file",
      path: `batch-delta/${sourceFile}`,
      displayName: `${sourceFile} (source under test)`,
      content: sourceCode,
    });
  }
  // Re-attach context files on every batch so the LLM never loses access
  if (contextFiles && contextFiles.length > 0) {
    for (const cf of contextFiles) {
      attachments.push({
        type: "virtual-file",
        path: `batch-delta/context/${cf.path}`,
        displayName: `${cf.path} (context)`,
        content: cf.content,
      });
    }
  }

  const testPatternsSection = existingTestPatterns
    ? [
        "## Test Style Reference",
        "The following patterns are from the existing test suite for this module. Match this style exactly:",
        "<test_patterns>",
        existingTestPatterns,
        "</test_patterns>",
        "",
      ]
    : [];

  const contextFilesList =
    contextFiles && contextFiles.length > 0
      ? contextFiles.map((cf) => `\`${cf.path} (context)\``).join(", ")
      : "";

  const prompt = [
    ...testPatternsSection,
    `Generate ${lang.testFramework} tests for the uncovered markers at lines: ${markerLines}.`,
    ...(sourceFile
      ? [
          `The source-under-test is attached as \`${sourceFile} (source under test)\`. Use it to identify importable symbols, function signatures, and branch logic.`,
        ]
      : []),
    ...(contextFilesList
      ? [
          `Context files are attached: ${contextFilesList}. Use them for helper functions, types, and dependencies.`,
        ]
      : []),
    ...(existingTestFile
      ? [
          `The existing-suite example is attached as \`${existingTestFile}\` and is authoritative for test structure.`,
        ]
      : []),
    "If an existing-test example is attached, mirror its structure exactly: class-vs-function shape, decorators, fixtures, setup flow, helper usage, and assertion style.",
    "Use only fixture names, helper names, decorators, imports, and symbols that are visible in the attached source-under-test, context files, or existing tests.",
    "Do NOT invent missing fixtures or imports.",
    "Do NOT generate module-import smoke tests, reflection tests, or 'symbol exists' tests.",
    "If the existing tests show class-based tests, add tests in that same class-oriented style rather than switching to top-level functions.",
    "All files you need are attached to this message. Do NOT skip branches because of missing context — everything is provided.",
    "Do not restate or regenerate surrounding context; focus only on the current uncovered markers.",
    "Cover as many markers as naturally fit together with the fewest high-value tests.",
    "Current marker details:",
    markerSummaries,
    "Respond with EXACTLY ONE valid JSON object matching this schema.",
    "The first character of your response must be `{` and the last character must be `}`.",
    "Do NOT use markdown fences or add any explanation, commentary, headings, or prose before or after the JSON.",
    "Every string value must be properly JSON-escaped.",
    "The `code` field must be a JSON string with escaped newlines, quotes, and backslashes, as if produced by `JSON.stringify(...)`.",
    "Before sending, self-check that your entire response can be parsed by `JSON.parse(...)` with no preprocessing.",
    "Schema:",
    schema,
  ].join("\n\n");

  return { prompt, attachments };
}
