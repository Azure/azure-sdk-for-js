// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * build-prompt.ts
 *
 * Assembles a complete agent prompt for test generation by combining:
 * coverage gaps, source code, example files, and instructions.
 */

import { resolve } from "node:path";
import { filterGapsForFile, formatGaps } from "./extract-gaps.ts";
import type { ExtractGapsResult } from "./extract-gaps.ts";
import { extractConventions } from "./extract-conventions.ts";
import { tryReadFile, numberLines } from "./utils.ts";
import { defaults, codeFenceFor } from "./config.ts";
import type { ExamplesConfig, LanguageConfig } from "./config.ts";

export interface PromptContext {
  gapsResult: ExtractGapsResult;
  /** The test directory tree as a newline-separated string. */
  folderTree: string;
  /** Absolute paths to existing spec files. */
  specFiles: string[];
  examples?: ExamplesConfig;
  /** Language settings for prompts and code fences. */
  language?: LanguageConfig;
  /** Test directory name (e.g., "test") for output path instructions. */
  testDir?: string;
}

export async function buildPrompt(
  packageDir: string,
  sourceFile: string,
  ctx: PromptContext,
): Promise<string> {
  const examples = ctx.examples ?? defaults.examples;
  const lang = ctx.language ?? defaults.language;
  const testDir = ctx.testDir ?? defaults.paths.testDir;

  const [sourceCode, conventions] = await Promise.all([
    tryReadFile(resolve(packageDir, sourceFile)),
    extractConventions(packageDir, ctx.specFiles, {
      count: examples.count,
      maxLines: examples.maxLines,
      language: lang,
    }),
  ]);

  if (!sourceCode) throw new Error(`Source file not found: ${resolve(packageDir, sourceFile)}`);

  const gapsResult = filterGapsForFile(ctx.gapsResult, sourceFile);

  const gapsMarkdown = formatGaps(gapsResult);

  const sections = [
    `# Test Generation Task

You are writing ${lang.testFramework} tests to improve code coverage.

## Target File

**File:** \`${sourceFile}\`

\`\`\`${codeFenceFor(lang.outputExtension)}
${numberLines(sourceCode)}
\`\`\``,

    `## Coverage Gaps

${gapsMarkdown}`,

    `## Test Directory Structure

\`\`\`
${ctx.folderTree}
\`\`\``,

    conventions,

    `## Instructions

1. Write tests that target EVERY uncovered code path listed above.
2. For each uncovered branch: determine what input would trigger that specific branch, then write a test with that input.
3. For error paths: construct inputs that force the error condition.
4. Import ONLY from the package's public API surface — not internal imports.
5. Match the naming convention and directory placement visible in the test directory structure.
6. If a test reveals behavior that contradicts the documentation or type signature, mark it as a todo with description: "POTENTIAL BUG: <description>"

## Output

Respond with JSON containing:
- "path": the relative test file path (starting with ${testDir}/, ending with ${lang.outputExtension})
- "code": the complete test file content`,
  ];

  return sections.filter(Boolean).join("\n\n");
}
