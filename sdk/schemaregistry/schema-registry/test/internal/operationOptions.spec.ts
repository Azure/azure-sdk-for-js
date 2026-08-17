// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SchemaRegistryClient } from "../../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { assert, describe, expect, it } from "vitest";

describe("operation options", () => {
  it("sends deprecated customHeaders with canonical headers taking precedence", async () => {
    const receivedHeaders = new Map<string, string | undefined>();
    const credential: TokenCredential = {
      getToken: async () => ({
        token: "fakevalue",
        expiresOnTimestamp: Date.now() + 24 * 60 * 60 * 1000,
      }),
    };
    const client = new SchemaRegistryClient("https://example.servicebus.windows.net", credential, {
      httpClient: {
        sendRequest: async (request) => {
          receivedHeaders.set("x-legacy", request.headers.get("x-legacy"));
          receivedHeaders.set("x-current", request.headers.get("x-current"));
          receivedHeaders.set("x-shared", request.headers.get("x-shared"));
          throw new Error("request captured");
        },
      },
    });

    await expect(
      client.getSchema("schema-id", {
        requestOptions: {
          customHeaders: {
            "x-legacy": "legacy",
            "x-shared": "legacy",
          },
          headers: {
            "x-current": "current",
            "x-shared": "current",
          },
        },
      }),
    ).rejects.toThrow("request captured");

    assert.equal(receivedHeaders.get("x-legacy"), "legacy");
    assert.equal(receivedHeaders.get("x-current"), "current");
    assert.equal(receivedHeaders.get("x-shared"), "current");
  });
});
