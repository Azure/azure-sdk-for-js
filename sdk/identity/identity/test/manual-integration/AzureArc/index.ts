// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecretClient } from "@azure/keyvault-secrets";
import { ManagedIdentityCredential } from "@azure/identity";

async function main(): Promise<void> {
  // This will use the system managed identity
  const credential = new ManagedIdentityCredential();

  const vaultUri = process.env.KEYVAULT_URI;

  if (!vaultUri) {
    throw new Error("Missing KEYVAULT_URI environment variable.");
  }
  const client = new SecretClient(vaultUri, credential);

  await client.setSecret("secret-name-system", "secret-value-system");

  console.log("Successfully authenticated with Key Vault!");
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
