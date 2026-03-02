// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { afterEach, assert, describe, it, vi } from "vitest";
import {
  isVersionPublished,
  getReleaseTag,
  getModifiedFilesSinceTag,
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

describe("getModifiedFilesSinceTag", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns list of modified files when files have changed", () => {
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
  });

  it("returns empty array when no files have changed", () => {
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

  it("throws an error when tag does not exist", () => {
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 128,
      stdout: "",
      stderr: "fatal: bad revision '@azure/storage-blob_1.2.3'",
    });
    assert.throws(
      () => getModifiedFilesSinceTag("@azure/storage-blob_1.2.3", "/repo/sdk/storage/storage-blob"),
      /git diff failed with exit code 128/,
    );
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
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 0,
      stdout: "\n",
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
    vi.mocked(spawnGitWithOutput).mockReturnValueOnce({
      status: 128,
      stdout: "",
      stderr: "fatal: bad revision '@azure/storage-blob_1.2.3'",
    });

    const result = verifyPackages(["@azure/storage-blob"], ["/repo/sdk/storage/storage-blob"]);
    assert.strictEqual(result, 1);
  });
});
