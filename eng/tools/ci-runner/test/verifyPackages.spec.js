// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { afterEach, assert, describe, it, vi } from "vitest";
import {
  isVersionPublished,
  getReleaseTag,
  resolveTagToCommit,
  getModifiedFilesSinceTag,
  filterRelevantFiles,
  verifyPackages,
} from "../src/verifyPackages.js";

vi.mock("../src/spawn.js", async () => {
  return {
    spawnPnpmWithOutput: vi.fn(),
    spawnGitWithOutput: vi.fn(),
  };
});

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    .../** @type {object} */ (actual),
    default: {
      .../** @type {object} */ (actual).default,
      existsSync: vi.fn(),
      readFileSync: vi.fn(),
    },
  };
});

vi.mock("../src/env.js", async () => {
  return {
    getBaseDir: vi.fn(() => "/repo"),
  };
});

const { spawnPnpmWithOutput, spawnGitWithOutput } = await import("../src/spawn.js");
const fs = await import("node:fs");

describe("isVersionPublished", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns true when pnpm view reports the version exists", () => {
    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce("1.2.3\n");
    assert.strictEqual(isVersionPublished("@azure/storage-blob", "1.2.3"), true);
    assert.deepEqual(vi.mocked(spawnPnpmWithOutput).mock.calls[0].slice(1), [
      "view",
      "@azure/storage-blob@1.2.3",
      "version",
    ]);
  });

  it("returns false when pnpm view returns a different version", () => {
    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce("1.2.2\n");
    assert.strictEqual(isVersionPublished("@azure/storage-blob", "1.2.3"), false);
  });

  it("returns false when pnpm view throws (package not found)", () => {
    vi.mocked(spawnPnpmWithOutput).mockImplementationOnce(() => {
      throw new Error("E404");
    });
    assert.strictEqual(isVersionPublished("@azure/new-package", "1.0.0"), false);
  });

  it("returns false when pnpm view returns empty output", () => {
    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce("");
    assert.strictEqual(isVersionPublished("@azure/storage-blob", "1.2.3"), false);
  });
});

describe("getReleaseTag", () => {
  it("formats the tag as packageName_version", () => {
    assert.strictEqual(getReleaseTag("@azure/storage-blob", "1.2.3"), "@azure/storage-blob_1.2.3");
  });

  it("handles scoped package names correctly", () => {
    assert.strictEqual(
      getReleaseTag("@azure-rest/core-client", "2.0.0-beta.1"),
      "@azure-rest/core-client_2.0.0-beta.1",
    );
  });
});

describe("resolveTagToCommit", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns the commit hash when the tag exists on remote", () => {
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "abc123def456\trefs/tags/@azure/storage-blob_1.2.3\n",
      stderr: "",
    });
    assert.strictEqual(resolveTagToCommit("@azure/storage-blob_1.2.3"), "abc123def456");
  });

  it("throws when the tag is not found on remote", () => {
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "",
      stderr: "",
    });
    assert.throws(
      () => resolveTagToCommit("@azure/storage-blob_9.9.9"),
      /Tag "@azure\/storage-blob_9.9.9" not found on remote/,
    );
  });

  it("throws when git ls-remote fails", () => {
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 128,
      stdout: "",
      stderr: "fatal: unable to access remote",
    });
    assert.throws(
      () => resolveTagToCommit("@azure/storage-blob_1.2.3"),
      /git ls-remote failed with exit code 128/,
    );
  });
});

describe("getModifiedFilesSinceTag", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns list of modified files when files have changed", () => {
    // ls-remote resolves tag to commit hash
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "abc123\trefs/tags/@azure/storage-blob_1.2.3\n",
      stderr: "",
    });
    // git diff with commit hash
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "sdk/storage/storage-blob/src/index.ts\nsdk/storage/storage-blob/package.json\n",
      stderr: "",
    });
    const result = getModifiedFilesSinceTag(
      "@azure/storage-blob_1.2.3",
      "/repo/sdk/storage/storage-blob",
    );
    assert.deepStrictEqual(result, [
      "sdk/storage/storage-blob/src/index.ts",
      "sdk/storage/storage-blob/package.json",
    ]);
    // Verify git diff was called with the commit hash, not the tag name
    const diffCall = vi.mocked(spawnGitWithOutput).mock.calls[1];
    assert.strictEqual(diffCall[3], "abc123");
  });

  it("returns empty array when no files have changed", () => {
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "abc123\trefs/tags/@azure/storage-blob_1.2.3\n",
      stderr: "",
    });
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "\n",
      stderr: "",
    });
    const result = getModifiedFilesSinceTag(
      "@azure/storage-blob_1.2.3",
      "/repo/sdk/storage/storage-blob",
    );
    assert.deepStrictEqual(result, []);
  });

  it("throws when tag is not found on remote", () => {
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "",
      stderr: "",
    });
    assert.throws(
      () => getModifiedFilesSinceTag("@azure/storage-blob_1.2.3", "/repo/sdk/storage/storage-blob"),
      /Tag "@azure\/storage-blob_1.2.3" not found on remote/,
    );
  });

  it("throws when git diff fails", () => {
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "abc123\trefs/tags/@azure/storage-blob_1.2.3\n",
      stderr: "",
    });
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 128,
      stdout: "",
      stderr: "fatal: bad object abc123",
    });
    assert.throws(
      () => getModifiedFilesSinceTag("@azure/storage-blob_1.2.3", "/repo/sdk/storage/storage-blob"),
      /git diff failed with exit code 128/,
    );
  });
});

describe("filterRelevantFiles", () => {
  const pkgDir = "sdk/storage/storage-blob";

  it("includes .ts and .js source files under src/", () => {
    const files = [
      "sdk/storage/storage-blob/src/index.ts",
      "sdk/storage/storage-blob/src/utils.js",
      "sdk/storage/storage-blob/src/helpers.mts",
      "sdk/storage/storage-blob/src/config.mjs",
      "sdk/storage/storage-blob/src/compat.cts",
      "sdk/storage/storage-blob/src/legacy.cjs",
      "sdk/storage/storage-blob/src/App.tsx",
      "sdk/storage/storage-blob/src/Widget.jsx",
    ];
    assert.deepStrictEqual(filterRelevantFiles(files, pkgDir), files);
  });

  it("excludes files under generated/", () => {
    const files = [
      "sdk/storage/storage-blob/generated/client.ts",
      "sdk/storage/storage-blob/generated/models/index.ts",
    ];
    assert.deepStrictEqual(filterRelevantFiles(files, pkgDir), []);
  });

  it("excludes non-ts/js files", () => {
    const files = [
      "sdk/storage/storage-blob/package.json",
      "sdk/storage/storage-blob/README.md",
      "sdk/storage/storage-blob/CHANGELOG.md",
      "sdk/storage/storage-blob/tsconfig.json",
      "sdk/storage/storage-blob/src/data.json",
    ];
    assert.deepStrictEqual(filterRelevantFiles(files, pkgDir), []);
  });

  it("excludes files under test/", () => {
    const files = [
      "sdk/storage/storage-blob/test/unit.spec.ts",
      "sdk/storage/storage-blob/test/utils/helpers.mts",
    ];
    assert.deepStrictEqual(filterRelevantFiles(files, pkgDir), []);
  });

  it("excludes files under samples/", () => {
    const files = [
      "sdk/storage/storage-blob/samples/example.ts",
      "sdk/storage/storage-blob/samples/demo.jsx",
    ];
    assert.deepStrictEqual(filterRelevantFiles(files, pkgDir), []);
  });

  it("excludes files under samples-dev/", () => {
    const files = [
      "sdk/storage/storage-blob/samples-dev/listBlobs.ts",
      "sdk/storage/storage-blob/samples-dev/upload.mjs",
    ];
    assert.deepStrictEqual(filterRelevantFiles(files, pkgDir), []);
  });

  it("excludes config files in package root", () => {
    const files = [
      "sdk/storage/storage-blob/vitest.config.ts",
      "sdk/storage/storage-blob/vitest.browser.config.ts",
      "sdk/storage/storage-blob/vitest.esm.config.ts",
      "sdk/storage/storage-blob/karma.conf.js",
    ];
    assert.deepStrictEqual(filterRelevantFiles(files, pkgDir), []);
  });

  it("excludes files under swagger/ and review/", () => {
    const files = [
      "sdk/storage/storage-blob/swagger/README.md",
      "sdk/storage/storage-blob/review/storage-blob.api.md",
    ];
    assert.deepStrictEqual(filterRelevantFiles(files, pkgDir), []);
  });

  it("returns mixed results correctly", () => {
    const files = [
      "sdk/storage/storage-blob/src/index.ts",
      "sdk/storage/storage-blob/test/unit.spec.ts",
      "sdk/storage/storage-blob/samples-dev/demo.ts",
      "sdk/storage/storage-blob/README.md",
      "sdk/storage/storage-blob/src/client.js",
      "sdk/storage/storage-blob/src/config.mjs",
      "sdk/storage/storage-blob/test/helpers.cjs",
      "sdk/storage/storage-blob/src/App.tsx",
      "sdk/storage/storage-blob/vitest.config.ts",
      "sdk/storage/storage-blob/generated/models.ts",
    ];
    assert.deepStrictEqual(filterRelevantFiles(files, pkgDir), [
      "sdk/storage/storage-blob/src/index.ts",
      "sdk/storage/storage-blob/src/client.js",
      "sdk/storage/storage-blob/src/config.mjs",
      "sdk/storage/storage-blob/src/App.tsx",
    ]);
  });
});

describe("verifyPackages", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns 0 when version is not published (new version)", () => {
    vi.mocked(fs.default.existsSync).mockReturnValueOnce(true);
    vi.mocked(fs.default.readFileSync).mockReturnValueOnce(
      JSON.stringify({ name: "@azure/storage-blob", version: "2.0.0" }),
    );
    // pnpm view throws → not published
    vi.mocked(spawnPnpmWithOutput).mockImplementationOnce(() => {
      throw new Error("E404");
    });

    const result = verifyPackages(["@azure/storage-blob"], ["/repo/sdk/storage/storage-blob"]);
    assert.strictEqual(result, 0);
  });

  it("returns 0 when version is published and no files modified", () => {
    vi.mocked(fs.default.existsSync).mockReturnValueOnce(true);
    vi.mocked(fs.default.readFileSync).mockReturnValueOnce(
      JSON.stringify({ name: "@azure/storage-blob", version: "1.2.3" }),
    );
    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce("1.2.3\n");
    // ls-remote
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "abc123\trefs/tags/@azure/storage-blob_1.2.3\n",
      stderr: "",
    });
    // git diff
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "\n",
      stderr: "",
    });

    const result = verifyPackages(["@azure/storage-blob"], ["/repo/sdk/storage/storage-blob"]);
    assert.strictEqual(result, 0);
  });

  it("returns 0 when only non-relevant files are modified (e.g. README, tests, samples)", () => {
    vi.mocked(fs.default.existsSync).mockReturnValueOnce(true);
    vi.mocked(fs.default.readFileSync).mockReturnValueOnce(
      JSON.stringify({ name: "@azure/storage-blob", version: "1.2.3" }),
    );
    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce("1.2.3\n");
    // ls-remote
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "abc123\trefs/tags/@azure/storage-blob_1.2.3\n",
      stderr: "",
    });
    // git diff — only non-relevant files changed
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout:
        [
          "sdk/storage/storage-blob/README.md",
          "sdk/storage/storage-blob/test/unit.spec.ts",
          "sdk/storage/storage-blob/samples-dev/demo.ts",
          "sdk/storage/storage-blob/samples/example.js",
          "sdk/storage/storage-blob/CHANGELOG.md",
        ].join("\n") + "\n",
      stderr: "",
    });

    const result = verifyPackages(["@azure/storage-blob"], ["/repo/sdk/storage/storage-blob"]);
    assert.strictEqual(result, 0);
  });

  it("returns 1 when version is published and files ARE modified", () => {
    vi.mocked(fs.default.existsSync).mockReturnValueOnce(true);
    vi.mocked(fs.default.readFileSync).mockReturnValueOnce(
      JSON.stringify({ name: "@azure/storage-blob", version: "1.2.3" }),
    );
    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce("1.2.3\n");
    // ls-remote
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "abc123\trefs/tags/@azure/storage-blob_1.2.3\n",
      stderr: "",
    });
    // git diff
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "sdk/storage/storage-blob/src/index.ts\n",
      stderr: "",
    });

    const result = verifyPackages(["@azure/storage-blob"], ["/repo/sdk/storage/storage-blob"]);
    assert.strictEqual(result, 1);
  });

  it("handles multiple packages with mixed pass/fail", () => {
    // First package: published, files modified → fail
    vi.mocked(fs.default.existsSync).mockReturnValueOnce(true);
    vi.mocked(fs.default.readFileSync).mockReturnValueOnce(
      JSON.stringify({ name: "@azure/storage-blob", version: "1.2.3" }),
    );
    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce("1.2.3\n");
    // ls-remote
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "abc123\trefs/tags/@azure/storage-blob_1.2.3\n",
      stderr: "",
    });
    // git diff
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "sdk/storage/storage-blob/src/index.ts\n",
      stderr: "",
    });

    // Second package: not published → pass
    vi.mocked(fs.default.existsSync).mockReturnValueOnce(true);
    vi.mocked(fs.default.readFileSync).mockReturnValueOnce(
      JSON.stringify({ name: "@azure/template", version: "2.0.0" }),
    );
    vi.mocked(spawnPnpmWithOutput).mockImplementationOnce(() => {
      throw new Error("E404");
    });

    const result = verifyPackages(
      ["@azure/storage-blob", "@azure/template"],
      ["/repo/sdk/storage/storage-blob", "/repo/sdk/template/template"],
    );
    assert.strictEqual(result, 1);
  });

  it("returns 1 when package.json is missing", () => {
    vi.mocked(fs.default.existsSync).mockReturnValueOnce(false);

    const result = verifyPackages(["@azure/storage-blob"], ["/repo/sdk/storage/storage-blob"]);
    assert.strictEqual(result, 1);
  });

  it("returns 1 when git diff fails (e.g. tag not found)", () => {
    vi.mocked(fs.default.existsSync).mockReturnValueOnce(true);
    vi.mocked(fs.default.readFileSync).mockReturnValueOnce(
      JSON.stringify({ name: "@azure/storage-blob", version: "1.2.3" }),
    );
    vi.mocked(spawnPnpmWithOutput).mockReturnValueOnce("1.2.3\n");
    // ls-remote returns empty → tag not found on remote
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "",
      stderr: "",
    });

    const result = verifyPackages(["@azure/storage-blob"], ["/repo/sdk/storage/storage-blob"]);
    assert.strictEqual(result, 1);
  });
});
