// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InteractiveBrowserCredential } from "@azure/identity";
import { KeyClient } from "@azure/keyvault-keys";

async function main(): Promise<void> {
  const credential = new InteractiveBrowserCredential({
    // By default, tenantId will be "organizations". You might assign a specific tenant this way.
    tenantId: process.env.AZURE_TENANT_ID,
    // By default, clientId will be the same used by the Azure CLI. You might assign a specific client ID this way.
    clientId: process.env.AZURE_CLIENT_ID
  });

  const keyVaultUrl = `https://key-vault-name.vault.azure.net`;
  const client = new KeyClient(keyVaultUrl, credential);

  // Retrieving the properties of the existing keys in that specific Key Vault.
  console.log(await client.listPropertiesOfKeys().next());
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
