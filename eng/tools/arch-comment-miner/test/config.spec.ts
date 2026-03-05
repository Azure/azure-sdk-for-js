// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { mergeConfig, patternToRegex } from "../src/config.ts";

describe("mergeConfig", () => {
  it("uses CLI overrides over config values", () => {
    const raw = {
      repo: "Azure/azure-sdk-for-js",
      since: "2024-01-01",
      until: "2024-12-31",
      output: "from-config",
    };

    const config = mergeConfig(raw, {
      since: "2025-06-01",
      output: "from-cli",
    });

    expect(config.repo).toBe("Azure/azure-sdk-for-js");
    expect(config.since).toBe("2025-06-01");
    expect(config.until).toBe("2024-12-31");
    expect(config.output).toBe("from-cli");
  });

  it("falls back to defaults when no config or CLI args", () => {
    const config = mergeConfig(undefined, {});

    expect(config.repo).toBe("");
    expect(config.since).toBe("");
    expect(config.filters.files).toEqual(["review/.*\\.api\\.md$"]);
    expect(config.filters.authors).toEqual([]);
    expect(config.filters.ignoreAuthors).toEqual([]);
  });

  it("preserves filters from config", () => {
    const raw = {
      repo: "Azure/azure-sdk-for-js",
      since: "2024-01-01",
      filters: {
        files: ["src/**/*.ts"],
        authors: ["alice", "bob"],
        ignoreAuthors: ["dependabot"],
      },
    };

    const config = mergeConfig(raw, {});

    expect(config.filters.files).toEqual(["src/**/*.ts"]);
    expect(config.filters.authors).toEqual(["alice", "bob"]);
    expect(config.filters.ignoreAuthors).toEqual(["dependabot"]);
  });
});

describe("patternToRegex", () => {
  it("converts simple glob with single *", () => {
    const re = patternToRegex("review/*.api.md");
    expect(re.test("review/foo.api.md")).toBe(true);
    expect(re.test("review/bar.api.md")).toBe(true);
    expect(re.test("review/sub/foo.api.md")).toBe(false);
  });

  it("converts ** to match across directories", () => {
    const re = patternToRegex("sdk/**/review/*.api.md");
    expect(re.test("sdk/foo/bar/review/baz.api.md")).toBe(true);
    expect(re.test("sdk/foo/review/x.api.md")).toBe(true);
    expect(re.test("other/foo/review/x.api.md")).toBe(false);
  });

  it("handles regex-special characters in path", () => {
    const re = patternToRegex("review/foo.bar.api.md");
    expect(re.test("review/foo.bar.api.md")).toBe(true);
    expect(re.test("review/fooxbar.api.md")).toBe(false);
  });

  it("matches exact regex patterns", () => {
    const re = patternToRegex("review/.*\\.api\\.md$");
    expect(re.test("sdk/foo/review/foo.api.md")).toBe(true);
    expect(re.test("sdk/foo/review/foo.txt")).toBe(false);
  });
});
