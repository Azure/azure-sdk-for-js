// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, afterEach } from "vitest";
import { setPlatformSpecificData } from "../../src/util/userAgentPlatform.js";
import process from "node:process";

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

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should handle an empty process.versions", async () => {
    (vi.mocked(process) as any).versions = undefined;
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.notOk(map.has("Node"));
    assert.notOk(map.has("Deno"));
    assert.notOk(map.has("Bun"));
  });

  it("should handle a Node.js process.versions with Bun", async () => {
    (vi.mocked(process) as any).versions = { bun: "1.0.0" };
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.ok(map.has("Bun"));
    assert.ok(map.get("Bun")?.startsWith("1.0.0 ("));
    assert.notOk(map.has("Node"));
    assert.notOk(map.has("Deno"));
  });

  it("should handle a Node.js process.versions with Deno", async () => {
    (vi.mocked(process) as any).versions = { deno: "2.0.0" };
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.ok(map.has("Deno"));
    assert.ok(map.get("Deno")?.startsWith("2.0.0 ("));
    assert.notOk(map.has("Node"));
    assert.notOk(map.has("Bun"));
  });

  it("should handle a Node.js process.versions", async () => {
    (vi.mocked(process) as any).versions = { node: "20.0.0" };
    const map = new Map<string, string>();

    await setPlatformSpecificData(map);

    assert.ok(map.has("Node"));
    assert.ok(map.get("Node")?.startsWith("20.0.0 ("));
    assert.notOk(map.has("Deno"));
    assert.notOk(map.has("Bun"));
  });
});
