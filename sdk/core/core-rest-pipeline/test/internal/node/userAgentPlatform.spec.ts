// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, afterEach, beforeEach } from "vitest";
import { getHeaderName, setPlatformSpecificData } from "../../../src/util/userAgentPlatform.js";
import process from "node:process";
import os from "node:os";

vi.mock("node:process", async () => {
  const actual = (await vi.importActual("node:process")) as Record<string, unknown>;
  return {
    default: {
      ...(actual.default as Record<string, unknown>),
      versions: {},
    },
  };
});

vi.mock("node:os", async () => {
  const actual = (await vi.importActual("node:os")) as Record<string, unknown>;
  return {
    default: {
      ...(actual.default as Record<string, unknown>),
      versions: {},
    },
  };
});

describe("userAgentPlatform", () => {
  it("should return 'User-Agent' as the header name", () => {
    assert.equal(getHeaderName(), "User-Agent");
  });

  beforeEach(() => {
    const mockedOs = vi.mocked(os) as unknown as Record<string, () => string>;
    mockedOs.type = () => "Linux";
    mockedOs.release = () => "6.13.8";
    mockedOs.arch = () => "x64";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should handle an empty process.versions", async () => {
    const mockedProcess = vi.mocked(process) as unknown as {
      versions: typeof process.versions | undefined;
    };
    mockedProcess.versions = undefined;
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Deno"));
    assert.isFalse(map.has("Bun"));
  });

  it("should handle a Node.js process.versions with Bun", async () => {
    const mockedProcess = vi.mocked(process) as unknown as { versions: Record<string, string> };
    mockedProcess.versions = { bun: "1.0.0" };
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isTrue(map.has("Bun"));
    assert.equal(map.get("Bun"), "1.0.0 (Linux 6.13.8; x64)");
    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Deno"));
  });

  it("should handle a Node.js process.versions with Deno", async () => {
    const mockedProcess = vi.mocked(process) as unknown as { versions: Record<string, string> };
    mockedProcess.versions = { deno: "2.0.0" };
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isTrue(map.has("Deno"));
    assert.equal(map.get("Deno"), "2.0.0 (Linux 6.13.8; x64)");
    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Bun"));
  });

  it("should handle a process.versions with no known runtime", async () => {
    const mockedProcess = vi.mocked(process) as unknown as { versions: Record<string, string> };
    mockedProcess.versions = { v8: "12.0.0" };
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Deno"));
    assert.isFalse(map.has("Bun"));
  });

  it("should handle a Node.js process.versions", async () => {
    const mockedProcess = vi.mocked(process) as unknown as { versions: Record<string, string> };
    mockedProcess.versions = { node: "20.0.0" };
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isTrue(map.has("Node"));
    assert.equal(map.get("Node"), "20.0.0 (Linux 6.13.8; x64)");
    assert.isFalse(map.has("Deno"));
    assert.isFalse(map.has("Bun"));
  });
});
