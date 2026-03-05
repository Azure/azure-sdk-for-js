// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile } from "node:fs/promises";
import { parse as parseYaml } from "yaml";

/** Filters applied when fetching and selecting review threads. */
export interface MineFilters {
  /** Glob-like patterns for file paths to include (e.g. "review/*.api.md"). Matched via RegExp. */
  files: string[];
  /** Only include threads where at least one comment is by these authors. */
  authors: string[];
  /** Exclude threads where all comments are by these authors. */
  ignoreAuthors: string[];
}

/** Full config for the mine subcommand. */
export interface MineConfig {
  repo: string;
  since: string;
  until: string;
  output: string;
  filters: MineFilters;
}

/** Raw shape of the YAML config file. */
interface RawConfig {
  repo?: string;
  since?: string;
  until?: string;
  output?: string;
  filters?: {
    files?: string[];
    authors?: string[];
    ignoreAuthors?: string[];
  };
}

const DEFAULT_FILE_PATTERNS = ["review/.*\\.api\\.md$"];

/**
 * Loads and validates a YAML config file. CLI args override config values.
 */
export async function loadConfig(path: string): Promise<RawConfig> {
  const content = await readFile(path, "utf-8");
  return parseYaml(content) as RawConfig;
}

/**
 * Merges CLI args over config file defaults to produce a complete MineConfig.
 */
export function mergeConfig(
  raw: RawConfig | undefined,
  cliOverrides: {
    repo?: string;
    since?: string;
    until?: string;
    output?: string;
  },
): MineConfig {
  const repo = cliOverrides.repo ?? raw?.repo ?? "";
  const since = cliOverrides.since ?? raw?.since ?? "";
  const until = cliOverrides.until ?? raw?.until ?? new Date().toISOString().slice(0, 10);
  const output = cliOverrides.output ?? raw?.output ?? "architecture-review-feedback";

  const filters: MineFilters = {
    files: raw?.filters?.files ?? DEFAULT_FILE_PATTERNS,
    authors: raw?.filters?.authors ?? [],
    ignoreAuthors: raw?.filters?.ignoreAuthors ?? [],
  };

  return { repo, since, until, output, filters };
}

/**
 * Converts a file filter pattern to a RegExp.
 * If the pattern contains regex metacharacters (like `.*`, `\\.`, `$`),
 * it is used as a regex directly. Otherwise, simple glob conversion:
 *   "*" → [^/]*
 *   "**" → .*
 */
export function patternToRegex(pattern: string): RegExp {
  // If it looks like an explicit regex (contains \, $, or .* without a glob **)
  if (/\\[.dswDSW]|\$$|(?<!\*)\.\*/.test(pattern)) {
    return new RegExp(pattern);
  }

  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replace(/\*\*/g, "⚑") // placeholder
    .replace(/\*/g, "[^/]*")
    .replace(/⚑/g, ".*");
  return new RegExp(escaped);
}
