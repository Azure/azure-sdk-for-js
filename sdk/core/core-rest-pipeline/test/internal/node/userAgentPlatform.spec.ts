// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, afterEach, beforeEach } from "vitest";
import { getHeaderName, setPlatformSpecificData } from "../../../src/util/userAgentPlatform.js";
import process from "node:process";
import os from "node:os";

vi.mock("node:process", async () => {
  const actual = await vi.importActual<typeof import("node:process") & { default: NodeJS.Process }>(
    "node:process",
  );
  return {
    default: {
      ...actual.default,
      versions: {},
    },
  };
});

vi.mock("node:os", async () => {
  const actual = await vi.importActual<
    typeof import("node:os") & { default: typeof import("node:os") }
  >("node:os");
  return {
    default: {
      ...actual.default,
      type: vi.fn(),
      release: vi.fn(),
      arch: vi.fn(),
    },
  };
});

describe("userAgentPlatform", () => {
  it("should return 'User-Agent' as the header name", () => {
    assert.equal(getHeaderName(), "User-Agent");
  });

  beforeEach(() => {
    vi.mocked(os.type).mockReturnValue("Linux");
    vi.mocked(os.release).mockReturnValue("6.13.8");
    vi.mocked(os.arch).mockReturnValue("x64");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should handle an empty process.versions", async () => {
    Object.defineProperty(process, "versions", { value: undefined, configurable: true });
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Deno"));
    assert.isFalse(map.has("Bun"));
  });

  it("should handle a Node.js process.versions with Bun", async () => {
    Object.defineProperty(process, "versions", { value: { bun: "1.0.0" }, configurable: true });
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isTrue(map.has("Bun"));
    assert.equal(map.get("Bun"), "1.0.0 (Linux 6.13.8; x64)");
    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Deno"));
  });

  it("should handle a Node.js process.versions with Deno", async () => {
    Object.defineProperty(process, "versions", { value: { deno: "2.0.0" }, configurable: true });
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isTrue(map.has("Deno"));
    assert.equal(map.get("Deno"), "2.0.0 (Linux 6.13.8; x64)");
    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Bun"));
  });

  it("should handle a process.versions with no known runtime", async () => {
    Object.defineProperty(process, "versions", { value: { v8: "12.0.0" }, configurable: true });
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Deno"));
    assert.isFalse(map.has("Bun"));
  });

  it("should handle a Node.js process.versions", async () => {
    Object.defineProperty(process, "versions", { value: { node: "20.0.0" }, configurable: true });
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isTrue(map.has("Node"));
    assert.equal(map.get("Node"), "20.0.0 (Linux 6.13.8; x64)");
    assert.isFalse(map.has("Deno"));
    assert.isFalse(map.has("Bun"));
  });
});
