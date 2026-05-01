// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { KeyClient } from "../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it, assert } from "vitest";

describe("Keys client - no recorder test", () => {
  it("can create a key client", async function () {
    const credential = new DefaultAzureCredential();
    const vaultUrl = process.env.KEYVAULT_URI || "https://test.vault.azure.net";
    const client = new KeyClient(vaultUrl, credential);
    
    // This test makes live calls without recorder
    const keys = client.listPropertiesOfKeys();
    const firstKey = await keys.next();
    assert.ok(firstKey);
  });
});
