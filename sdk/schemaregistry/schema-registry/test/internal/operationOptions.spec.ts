// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SchemaRegistryClient } from "../../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import { assert, describe, expect, it } from "vitest";

describe("operation options", () => {
  it("sends customHeaders through the handwritten REST operation layer", async () => {
    let customHeader: string | undefined;
    const credential: TokenCredential = {
      getToken: async () => ({
        token: "fakevalue",
        expiresOnTimestamp: Date.now() + 24 * 60 * 60 * 1000,
      }),
    };
    const client = new SchemaRegistryClient("https://example.servicebus.windows.net", credential, {
      httpClient: {
        sendRequest: async (request) => {
          customHeader = request.headers.get("x-custom-header");
          throw new Error("request captured");
        },
      },
    });

    await expect(
      client.getSchema("schema-id", {
        requestOptions: {
          customHeaders: {
            "x-custom-header": "custom-value",
          },
        },
      }),
    ).rejects.toThrow("request captured");

    assert.equal(customHeader, "custom-value");
  });
});
