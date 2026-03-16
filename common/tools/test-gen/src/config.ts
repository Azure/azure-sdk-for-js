// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * config.ts
 *
 * Central configuration schema for the test-gen tool.
 * Every tunable value in the system is surfaced here.
 */

/** How to run tests and where to find coverage output. */
export interface RunnerConfig {
  /** Shell command to run tests with coverage (cwd = packageDir). */
  command: string;
  /** Path to coverage JSON file, relative to packageDir. */
  coveragePath: string;
  /** Coverage data format: "istanbul" for JS/TS, "coveragepy" for Python. */
  coverageFormat: "istanbul" | "coveragepy";
  /** Command template to run a single test file ($FILE is replaced). */
  runSingle: string;
  /** Test execution timeout in ms. */
  timeout: number;
  /** Max stdout buffer size in bytes. */
  maxBuffer: number;
  /** Number of trailing stdout lines to display after a test run. */
  tailLines: number;
  /** Path to .coverage SQLite DB for test→source mapping (relative to packageDir). */
  coverageDbPath: string;
}

/** Directory and file naming conventions. */
export interface PathsConfig {
  /** Test directory relative to packageDir. */
  testDir: string;
  /** Source directory prefix used to filter Istanbul coverage entries. */
  sourcePrefix: string;
  /** File extensions to include when scanning the test directory. */
  testExtensions: string[];
  /** Suffix identifying spec/test files for example picking. */
  specSuffix: string;
  /** Substrings to exclude from spec file discovery. */
  specExclusions: string[];
  /** Substrings to exclude from source/coverage gap file selection. */
  sourceExclusions?: string[];
}

/** LLM interaction settings. */
export interface LlmConfig {
  /** Model for generation and context resolution prompts (fast, large context preferred). */
  model: string;
  /** Model for fix-loop prompts (stronger reasoning preferred). Falls back to `model`. */
  fixModel?: string;
}

/** Coverage loop parameters. */
export interface LoopConfig {
  /** Maximum fix attempts per generated test file (run tests → fix → repeat). */
  fixMaxIterations: number;
  /** Number of uncovered branches per LLM call in single-pass mode (default 5). */
  gapBatchSize: number;
  /** Maximum number of source files to target in single-pass mode. */
  maxGapFiles: number;
  /** Number of source files to process in parallel (default 1 = sequential). */
  concurrency: number;
}

/** Example test file selection for prompt building. */
export interface ExamplesConfig {
  /** Max lines to show from each example test file. */
  maxLines: number;
  /** Number of example test files to include in the prompt. */
  count: number;
}

/** Language-specific settings (override for non-JS/TS targets). */
export interface LanguageConfig {
  /** Test framework name (e.g., "vitest", "pytest", "junit"). */
  testFramework: string;
  /** File extension for generated test output (e.g., ".ts", ".py"). */
  outputExtension: string;
}

/** Derive a markdown code-fence language tag from the output extension. */
export function codeFenceFor(ext: string): string {
  const map: Record<string, string> = {
    ".ts": "typescript",
    ".js": "javascript",
    ".py": "python",
    ".java": "java",
    ".go": "go",
    ".cs": "csharp",
    ".rb": "ruby",
    ".rs": "rust",
    ".cpp": "cpp",
    ".c": "c",
  };
  return map[ext] ?? ext.replace(/^\./, "");
}

/** Complete configuration for the test-gen tool. */
export interface Config {
  runner: RunnerConfig;
  paths: PathsConfig;
  llm: LlmConfig;
  loop: LoopConfig;
  examples: ExamplesConfig;
  language: LanguageConfig;
}

export const defaults: Config = {
  runner: {
    command: "npm run test:node",
    coveragePath: "coverage/coverage-final.json",
    coverageFormat: "istanbul",
    runSingle: "npm run test:node -- $FILE",
    timeout: 120_000,
    maxBuffer: 10 * 1024 * 1024,
    tailLines: 20,
    coverageDbPath: ".coverage",
  },
  paths: {
    testDir: "test",
    sourcePrefix: "src/",
    testExtensions: [".ts", ".js"],
    specSuffix: ".spec.ts",
    specExclusions: ["snippets", "node_modules"],
  },
  llm: {
    model: "gpt-5.3-codex",
  },
  loop: {
    fixMaxIterations: 3,
    gapBatchSize: 5,
    maxGapFiles: 20,
    concurrency: 1,
  },
  examples: {
    maxLines: 80,
    count: 2,
  },
  language: {
    testFramework: "vitest",
    outputExtension: ".ts",
  },
};

/** Deep-merge a partial config over defaults. */
export function resolveConfig(
  overrides?: Partial<{
    [K in keyof Config]: Partial<Config[K]>;
  }>,
): Config {
  if (!overrides)
    return {
      runner: { ...defaults.runner },
      paths: { ...defaults.paths },
      llm: { ...defaults.llm },
      loop: { ...defaults.loop },
      examples: { ...defaults.examples },
      language: { ...defaults.language },
    };
  return {
    runner: { ...defaults.runner, ...overrides.runner },
    paths: { ...defaults.paths, ...overrides.paths },
    llm: { ...defaults.llm, ...overrides.llm },
    loop: { ...defaults.loop, ...overrides.loop },
    examples: { ...defaults.examples, ...overrides.examples },
    language: { ...defaults.language, ...overrides.language },
  };
}
