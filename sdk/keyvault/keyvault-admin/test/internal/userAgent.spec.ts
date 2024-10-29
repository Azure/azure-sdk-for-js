// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultAccessControlClient, SDK_VERSION } from "../../src/index.js";
import { describe, it, expect } from "vitest";

describe("Key Vault Admin's user agent", function () {
  it("SDK_VERSION and user-agent should match", async function () {
    let userAgent: string | undefined;
    const client = new KeyVaultAccessControlClient(
      "https://myvault.vault.azure.net",
      { getToken: () => Promise.resolve({ token: "my-token", expiresOnTimestamp: Date.now() }) }, // needed to support https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-client-rest/src/getClient.ts#L47
      {
        httpClient: {
          sendRequest: async (request) => {
            userAgent = request.headers.get("user-agent");
            throw new Error("only a test");
          },
        },
      },
    );

    try {
      await client.getRoleAssignment("/", "");
    } catch {
      // no-op, we don't care about the response, only the user-agent header
    }
    expect(userAgent).toBeDefined();
    expect(userAgent).toContain(`azsdk-js-keyvault-admin/${SDK_VERSION}`);
  });
});
