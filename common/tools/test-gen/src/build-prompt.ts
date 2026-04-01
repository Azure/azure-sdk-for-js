// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * build-prompt.ts
 *
 * Builds the seed and batch-delta prompts used by persistent generation sessions.
 */

import { resolve, basename as pathBasename } from "node:path";
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
  /** When true, generate integration/e2e tests that call real services instead of mocking. */
  e2eMode?: boolean;
  /** Content of test setup/fixtures file (key fixtures for e2e mode). */
  conftestContent?: string;
  /** Path to the test setup/fixtures file (used for attachment naming). */
  conftestPath?: string;
  /** Prompt instructions injected when e2e mode is active. */
  e2ePromptInstructions?: string;
  /** Instructions for unreachable-marker unit tests (e.g., allowed mocking tools). */
  unitTestMockInstructions?: string;
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

  if (ctx.conftestContent && ctx.e2eMode) {
    const conftestName = ctx.conftestPath ? pathBasename(ctx.conftestPath) : "test-fixtures";
    attachments.push({
      type: "virtual-file",
      path: `seed/${conftestName}`,
      displayName: `${conftestName} (test fixtures)`,
      content: ctx.conftestContent,
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
      "## CRITICAL: Symbol Accuracy Rule",
      "Before generating ANY test code in subsequent batches, you MUST mentally inventory the exact symbol names from the full source file.",
      "Common LLM mistakes to avoid:",
      "- Combining partial names (e.g. inventing `CategoricalDriftMetricThreshold` when the actual class is `CategoricalDataDriftMetricThreshold`)",
      "- Adding/removing leading underscores (e.g. `_get_directory_size` vs `get_directory_size`)",
      "- Confusing similar suffixes (e.g. `Metrics` vs `MetricThreshold`)",
      "- Inventing convenience functions that don't exist (e.g. `_parse_name_label` when only `_parse_name_version` exists)",
      "Every import, class instantiation, and function call MUST use a name copied character-for-character from the source. If you are unsure a symbol exists, do NOT use it.",
      "",
      "## Import accuracy rules",
      "- ONLY use symbols visible in the source file's own import statements or the conftest fixtures.",
      "- Do NOT invent private/internal names (prefixed with _) unless they appear in the source imports.",
      "- When the source uses an import, copy it exactly — same module path, same symbol name.",
      "- Check the source file's `from ... import ...` lines to find correct module paths.",
      "- If a class is imported as `from x import Foo`, use `Foo` not `_Foo`.",
      "",
      "The attached existing-test example, when present, is authoritative for file structure, helper usage, fixtures, decorators, imports, and naming.",
      "Do NOT invent fixtures, decorators, helper functions, imports, private symbols, or test scaffolding that are not visible in the attached source, context files, or existing tests.",
      "Do NOT write smoke tests that only import modules, inspect symbols, or assert generic presence. Write behavior tests for the uncovered branches.",
      "Do NOT use the word 'placeholder' or 'stub' in test names, comments, or docstrings — give every test a descriptive name reflecting its purpose.",
      "",
      ...(ctx.e2eMode && ctx.e2ePromptInstructions ? [
        ctx.e2ePromptInstructions,
        "",
      ] : []),
      "## Test Framework & Assertion Style",
      `Use ${lang.testFramework} as the test framework.`,
      "Every assertion must check a CONCRETE value or specific exception:",
      "- GOOD: assertEquals(result, 42), assert result == expected_value, expect(result).toBe(42)",
      "- GOOD: assertThrows(ExactType), expect(...).toThrow(ExactType), or framework-specific exception assertion",
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
  /** Extra instructions injected before the schema (e.g., e2e mode rules). */
  extraInstructions?: string,
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
      "covered_marker_lines": [${gaps[0]?.start.line ?? 0}]
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
    ...(sourceFile && sourceCode
      ? [
          `The source-under-test is attached as \`${sourceFile} (source under test)\` AND included inline below. Use it to identify importable symbols, function signatures, and branch logic.`,
          `<source_code file="${sourceFile}">`,
          sourceCode,
          `</source_code>`,
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
    "CRITICAL: Every import name and symbol you use MUST be copied character-for-character from the attached source. Do NOT combine partial names, add/remove underscores, or guess at suffixes. If unsure a symbol exists, do NOT use it.",
    "",
    "## Import accuracy rules",
    "- ONLY use symbols visible in the source file's own import statements or the conftest fixtures.",
    "- Do NOT invent private/internal names (prefixed with _) unless they appear in the source imports.",
    "- When the source uses an import, copy it exactly — same module path, same symbol name.",
    "- Check the source file's import lines to find correct module paths.",
    "- If a class is imported as `from x import Foo`, use `Foo` not `_Foo`.",
    "",
    "Do NOT invent missing fixtures or imports.",
    "Do NOT generate module-import smoke tests, reflection tests, or 'symbol exists' tests.",
    "If the existing tests show class-based tests, add tests in that same class-oriented style rather than switching to top-level functions.",
    "All files you need are attached to this message. Do NOT skip branches because of missing context — everything is provided.",
    "Do not restate or regenerate surrounding context; focus only on the current uncovered markers.",
    "Cover as many markers as naturally fit together with the fewest high-value tests.",
    ...(extraInstructions ? [extraInstructions] : []),
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

// ---------------------------------------------------------------------------
// Phase 1: Planner prompt — identify public API calls that exercise gaps
// ---------------------------------------------------------------------------

export interface PlannerResult {
  /** Public API call that exercises the gap (e.g., `client.data.get(name="x", version="1")`) */
  api_call: string;
  /** Expected outcome (e.g., "raises ResourceNotFoundError", "returns Model with name='x'") */
  expected_outcome: string;
  /** Coverage marker lines this call would exercise */
  marker_lines: number[];
  /** Brief explanation of why this call reaches the marked code */
  reasoning: string;
}

export function buildPlannerPrompt(
  gaps: CoverageGap[],
  sourceFile: string,
  sourceCode: string,
): { prompt: string; attachments: SendAttachment[] } {
  const markerSummaries = gaps
    .map((gap) => `- L${gap.start.line}-${gap.end.line} [${gap.type}] ${gap.detail}`)
    .join("\n");

  const attachments: SendAttachment[] = [
    {
      type: "virtual-file",
      path: `planner/${sourceFile}`,
      displayName: `${sourceFile} (source under test)`,
      content: sourceCode,
    },
  ];

  const schema = `[
  {
    "api_call": "client.<resource>.<operation>(<args>)",
    "expected_outcome": "raises <Exception> | returns <Type> with <properties>",
    "marker_lines": [<line numbers>],
    "reasoning": "why this call reaches the marked code path"
  }
]`;

  const prompt = `You are analyzing source code to find **public API calls** that exercise specific uncovered code paths.

## Source file: ${sourceFile}
The complete source is attached AND included inline below.

<source_code file="${sourceFile}">
${sourceCode}
</source_code>

## Uncovered markers to exercise
${markerSummaries}

## Your task
For each marker (or group of related markers), identify the **public client API call** that would exercise that code path.

Rules:
1. The call MUST go through the public client API.
2. Trace the code path from the public method down to the marked lines. Show your reasoning.
3. Choose arguments that will specifically trigger the marked branch (e.g., pass invalid args to trigger a validation branch, pass a nonexistent name to trigger a 404 path).
4. If a marker is inside a private helper that is NOT reachable from any public API call, mark it as unreachable: \`"api_call": "UNREACHABLE"\`
5. Group markers that would be exercised by the same API call.
6. For each call, state the expected outcome (exception type, return value, etc.)

Respond with EXACTLY ONE valid JSON array matching this schema.
The first character of your response must be \`[\` and the last character must be \`]\`.
Do NOT use markdown fences or add any explanation before or after the JSON.

Schema:
${schema}`;

  return { prompt, attachments };
}

// ---------------------------------------------------------------------------
// Phase 2: Coder prompt — generate tests from planner output
// ---------------------------------------------------------------------------

export function buildCoderPrompt(
  plannerOutput: PlannerResult[],
  lang: LanguageConfig,
  testDir: string,
  outputExtension: string,
  sourceFile: string,
  sourceCode: string,
  existingTestFile?: string,
  existingTestPatterns?: string,
  contextFiles?: ContextFile[],
  extraInstructions?: string,
  unitTestMockInstructions?: string,
): { prompt: string; attachments: SendAttachment[] } {
  const attachments: SendAttachment[] = [];
  if (sourceCode && sourceFile) {
    attachments.push({
      type: "virtual-file",
      path: `coder/${sourceFile}`,
      displayName: `${sourceFile} (source under test)`,
      content: sourceCode,
    });
  }
  if (contextFiles && contextFiles.length > 0) {
    for (const cf of contextFiles) {
      attachments.push({
        type: "virtual-file",
        path: `coder/context/${cf.path}`,
        displayName: `${cf.path} (context)`,
        content: cf.content,
      });
    }
  }

  const reachable = plannerOutput.filter((p) => p.api_call !== "UNREACHABLE");
  const unreachable = plannerOutput.filter((p) => p.api_call === "UNREACHABLE");

  const planTable = reachable
    .map(
      (p, i) =>
        `### Call ${i + 1}: \`${p.api_call}\`\n` +
        `- **Expected**: ${p.expected_outcome}\n` +
        `- **Markers**: L${p.marker_lines.join(", L")}\n` +
        `- **Reasoning**: ${p.reasoning}`,
    )
    .join("\n\n");

  const mockingNote = unitTestMockInstructions
    ? `- ${unitTestMockInstructions}`
    : "- You MAY use mocking for these tests ONLY.";
  const unreachableSection =
    unreachable.length > 0
      ? `\n\n## Unreachable markers → generate UNIT tests\nThese code paths are NOT reachable from the public API. Generate **unit tests** for them:\n- You MAY import and call internal/private functions directly.\n${mockingNote}\n- Still cover the marked branches and assert correct behavior.\n${unreachable.map((p) => `- L${p.marker_lines.join(", L")}: ${p.reasoning}`).join("\n")}`
      : "";

  const testPatternsSection = existingTestPatterns
    ? `## Test Style Reference\nMatch this style exactly:\n<test_patterns>\n${existingTestPatterns}\n</test_patterns>\n`
    : "";

  const contextFilesList =
    contextFiles && contextFiles.length > 0
      ? contextFiles.map((cf) => `\`${cf.path} (context)\``).join(", ")
      : "";

  const schema = `{
  "path": "${testDir}/test_<stem>_gaps.${outputExtension.replace(".", "")}",
  "code": "... complete test file content ...",
  "analysis": [
    {
      "test_name": "test_name_here",
      "covered_marker_lines": [0]
    }
  ],
  "skipped_markers": [
    {
      "marker_line": 0,
      "reason": "brief justification"
    }
  ]
}`;

  const prompt = [
    testPatternsSection,
    `## API Call Plan`,
    `A planner has already analyzed the source code and identified the exact public API calls needed to exercise uncovered branches. Generate ${lang.testFramework} tests for each call below.`,
    "",
    planTable,
    unreachableSection,
    "",
    `The source-under-test is attached as \`${sourceFile} (source under test)\` AND included inline below.`,
    `<source_code file="${sourceFile}">`,
    sourceCode,
    `</source_code>`,
    ...(contextFilesList
      ? [`Context files are attached: ${contextFilesList}. Use them for helper functions, types, and dependencies.`]
      : []),
    ...(existingTestFile
      ? [`The existing-suite example is attached as \`${existingTestFile}\` and is authoritative for test structure.`]
      : []),
    "",
    "## Instructions",
    "Write ONE test method for each API call in the plan above.",
    "For **reachable** calls (from the API Call Plan):",
    "1. Call the exact API shown in the plan with the specified arguments",
    "2. Assert the expected outcome (exception, return value, etc.)",
    "3. Use the public client fixture for all API calls",
    "4. Follow the test style reference exactly (decorators, class structure, fixtures)",
    "",
    "For **unreachable** markers (from the Unreachable section):",
    "1. Import and call the internal function directly",
    "2. Use mocking as needed to set up the code path",
    "3. Assert the expected behavior of the branch",
    "",
    "If an existing-test example is attached, mirror its structure exactly: class-vs-function shape, decorators, fixtures, setup flow, helper usage, and assertion style.",
    "Use only fixture names, helper names, decorators, imports, and symbols that are visible in the attached source-under-test, context files, or existing tests.",
    "CRITICAL: Every import name and symbol you use MUST be copied character-for-character from the attached source. Do NOT combine partial names, add/remove underscores, or guess at suffixes.",
    "",
    "## Import accuracy rules",
    "- ONLY use symbols visible in the source file's own import statements or the conftest fixtures.",
    "- Do NOT invent private/internal names (prefixed with _) unless they appear in the source imports.",
    "- When the source uses an import, copy it exactly — same module path, same symbol name.",
    "- Check the source file's import lines to find correct module paths.",
    "",
    "## Duplicate avoidance",
    "The context already includes the full existing test suite. Do NOT generate any test that duplicates a test already in the context — same API call, same scenario, same branch. If a plan entry is already covered by an existing test, SKIP it and list it in `skipped_markers` with reason 'duplicate of existing test'.",
    "",
    "Do NOT invent missing fixtures or imports.",
    "Do NOT generate module-import smoke tests, reflection tests, or 'symbol exists' tests.",
    ...(extraInstructions ? [extraInstructions] : []),
    "",
    "Respond with EXACTLY ONE valid JSON object matching this schema.",
    "The first character of your response must be `{` and the last character must be `}`.",
    "Do NOT use markdown fences or add any explanation before or after the JSON.",
    "Every string value must be properly JSON-escaped.",
    "The `code` field must be a JSON string with escaped newlines, quotes, and backslashes, as if produced by `JSON.stringify(...)`.",
    "Before sending, self-check that your entire response can be parsed by `JSON.parse(...)` with no preprocessing.",
    "Schema:",
    schema,
  ].join("\n\n");

  return { prompt, attachments };
}
