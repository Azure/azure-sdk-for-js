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
  /** Optional command to run after tests to ensure coverage report is generated.
   *  Useful when pytest-cov doesn't write JSON on failure. Runs regardless of test exit code. */
  postTestCommand?: string;
  /** Prompt instructions injected when e2e/integration test mode is active. */
  e2ePromptInstructions?: string;
  /** Instructions for unreachable-marker unit tests (e.g., allowed mocking tools). */
  unitTestMockInstructions?: string;
  /** Optional hint for the planner about how source files map to the public API surface.
   *  E.g., "Methods without leading underscore on *Operations classes are public API." */
  publicApiHint?: string;
  /** Optional command to measure final coverage (replaces `command` for the final run).
   *  Useful when generated tests need a different mode (e.g., live) than existing tests. */
  finalCoverageCommand?: string;
  /** Optional command to push test recordings after the final coverage run.
   *  E.g., `python scripts/manage_recordings.py push -p sdk/.../assets.json`. */
  recordingsPushCommand?: string;
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
  /** Substrings that source files must match to be considered (any match = included).
   *  When set, only files matching at least one inclusion pattern are targeted. */
  sourceInclusions?: string[];
  /** Directories (relative to packageDir) to search for existing test examples.
   *  When set, overrides coverage-based test map discovery with glob-based
   *  lookup in these directories. Useful for steering generation toward
   *  specific test styles (e.g., e2e tests instead of unit tests). */
  testContextDirs?: string[];
  /** Path to test setup/fixtures file (relative to packageDir).
   *  When set AND testContextDirs is set (e2e mode), the file's content is
   *  included as context so the LLM knows about available fixtures. */
  conftestPath?: string;
}

/** LLM interaction settings. */
export interface LlmConfig {
  /** Model for generation and context resolution prompts (fast, large context preferred). */
  model: string;
  /** Model for fix-loop prompts (stronger reasoning preferred). Falls back to `model`. */
  fixModel?: string;
  /** Maximum number of concurrent LLM requests (default 1). */
  concurrency: number;
}

/** Coverage loop parameters. */
export interface LoopConfig {
  /** Maximum fix attempts per generated test file (run tests → fix → repeat). */
  fixMaxIterations: number;
  /** Number of uncovered branches per LLM call in single-pass mode (default 12). */
  gapBatchSize: number;
  /** Maximum batches per source file (default 15). Caps LLM calls for large files. */
  maxBatchesPerFile: number;
  /** Maximum number of source files to target in single-pass mode. */
  maxGapFiles: number;
  /** Number of source files to process in parallel (default 1 = sequential). */
  concurrency: number;
  /** Number of generated files to send per isolation-fix prompt. */
  isolationBatchSize: number;
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
    concurrency: 1,
  },
  loop: {
    fixMaxIterations: 3,
    gapBatchSize: 12,
    maxBatchesPerFile: 15,
    maxGapFiles: 20,
    concurrency: 1,
    isolationBatchSize: 3,
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
