// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, afterEach, beforeEach } from "vitest";
import { setPlatformSpecificData } from "../../src/util/userAgentPlatform.js";
import process from "node:process";
import os from "node:os";

describe("userAgentPlatform", () => {
  vi.mock("node:process", async () => {
    const actual = await vi.importActual("node:process");
    return {
      default: {
        ...(actual as any).default,
        versions: {},
      },
    };
  });

  vi.mock("node:os", async () => {
    const actual = await vi.importActual("node:os");
    return {
      default: {
        ...(actual as any).default,
        versions: {},
      },
    };
  });

  beforeEach(() => {
    (vi.mocked(os) as any).type = () => "Linux";
    (vi.mocked(os) as any).release = () => "6.13.8";
    (vi.mocked(os) as any).arch = () => "x64";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should handle an empty process.versions", async () => {
    (vi.mocked(process) as any).versions = undefined;
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Deno"));
    assert.isFalse(map.has("Bun"));
  });

  it("should handle a Node.js process.versions with Bun", async () => {
    (vi.mocked(process) as any).versions = { bun: "1.0.0" };
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isTrue(map.has("Bun"));
    assert.equal(map.get("Bun"), "1.0.0 (Linux 6.13.8; x64)");
    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Deno"));
  });

  it("should handle a Node.js process.versions with Deno", async () => {
    (vi.mocked(process) as any).versions = { deno: "2.0.0" };
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isTrue(map.has("Deno"));
    assert.equal(map.get("Deno"), "2.0.0 (Linux 6.13.8; x64)");
    assert.isFalse(map.has("Node"));
    assert.isFalse(map.has("Bun"));
  });

  it("should handle a Node.js process.versions", async () => {
    (vi.mocked(process) as any).versions = { node: "20.0.0" };
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.isTrue(map.has("Node"));
    assert.equal(map.get("Node"), "20.0.0 (Linux 6.13.8; x64)");
    assert.isFalse(map.has("Deno"));
    assert.isFalse(map.has("Bun"));
  });
});
