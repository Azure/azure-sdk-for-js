// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * extract-conventions.ts
 *
 * Picks 1–2 representative existing spec files and returns them verbatim
 * as markdown. The LLM agent infers conventions from the examples directly.
 *
 * Accepts pre-collected file paths to avoid redundant readdir calls.
 */

import { readFile, stat } from "node:fs/promises";
import { relative } from "node:path";
import type { LanguageConfig } from "./config.ts";
import { codeFenceFor } from "./config.ts";

/** Options for extractConventions. */
export interface ConventionOptions {
  /** Number of example files to pick. */
  count?: number;
  /** Max lines to display per example. */
  maxLines?: number;
  /** Language settings for code fences and fallback messages. */
  language?: LanguageConfig;
}

/**
 * Pick representative test files and return their content as markdown.
 *
 * @param packageDir Absolute path to the package root.
 * @param specFiles  Absolute paths to spec/test files (pre-filtered by caller).
 * @param options    Convention extraction options.
 */
export async function extractConventions(
  packageDir: string,
  specFiles: string[],
  options: ConventionOptions = {},
): Promise<string> {
  const { count = 2, maxLines = 80, language } = options;
  const codeFence = codeFenceFor(language?.outputExtension ?? ".ts");
  const framework = language?.testFramework ?? "vitest";

  if (specFiles.length === 0) {
    return `## Example Test Files\n\nNo existing test files found. Use ${framework}.`;
  }

  // Stat all files to get sizes without reading content
  const entries = await Promise.all(
    specFiles.map(async (f) => ({ path: f, size: (await stat(f)).size })),
  );

  // Score: prefer median-sized files (not too small, not too large)
  const sizes = entries.map((e) => e.size).sort((a, b) => a - b);
  const medianSize = sizes[Math.floor(sizes.length / 2)];

  const scored = entries
    .map((e) => ({
      ...e,
      rel: relative(packageDir, e.path),
      score: -Math.abs(e.size - medianSize),
    }))
    .sort((a, b) => b.score - a.score);

  // Read only the top picks (not all files)
  const picks = await Promise.all(
    scored.slice(0, count).map(async ({ path: p, rel }) => ({
      rel,
      content: await readFile(p, "utf8"),
    })),
  );

  const sections = picks.map(({ rel, content }) => {
    const lines = content.split("\n");
    const display =
      lines.length > maxLines
        ? lines.slice(0, maxLines).join("\n") + `\n// ... (${lines.length - maxLines} more lines)`
        : content;
    return `**\`${rel}\`**\n\n\`\`\`${codeFence}\n${display}\n\`\`\``;
  });

  return `## Example Test Files\n\nFollow the conventions in these existing tests:\n\n${sections.join("\n\n")}`;
}
