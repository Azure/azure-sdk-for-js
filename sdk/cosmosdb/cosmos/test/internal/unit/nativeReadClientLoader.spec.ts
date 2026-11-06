// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";
import { resolve } from "node:path";
import { getNativeReadClientFactory } from "../../../src/utils/nativeReadClient.js";

const variable = "AZURE_COSMOS_EXPERIMENTAL_NATIVE_BINDING_PATH";

describe("experimental native binding loader", () => {
  afterEach(() => vi.unstubAllEnvs());

  it.each([undefined, "", "relative.node"])("rejects an invalid path %j", async (path) => {
    vi.stubEnv(variable, path);
    const factory = getNativeReadClientFactory();
    await expect(factory("https://example.documents.azure.com", "test-key")).rejects.toThrow(
      "must be an absolute path",
    );
  });

  it("captures the path before later environment changes", async () => {
    vi.stubEnv(variable, undefined);
    const factory = getNativeReadClientFactory();
    vi.stubEnv(variable, resolve("missing-prototype-binding.node"));
    await expect(factory("https://example.documents.azure.com", "test-key")).rejects.toThrow(
      "must be an absolute path",
    );
  });

  it("propagates an unavailable binding without returning a fallback client", async () => {
    vi.stubEnv(variable, resolve("missing-prototype-binding.node"));
    await expect(
      getNativeReadClientFactory()("https://example.documents.azure.com", "test-key"),
    ).rejects.toMatchObject({ code: "MODULE_NOT_FOUND" });
  });
});
