// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SecretClient } from "@azure/keyvault-secrets";
import { ManagedIdentityCredential } from "@azure/identity";

async function main(): Promise<void> {
  // Managed identity will use the managed identity in the environment called VM_ID_USER_ASSIGNED
  const credential = new ManagedIdentityCredential(process.env.VM_ID_USER_ASSIGNED!);

  const url = "https://" + process.env.KEY_VAULT_NAME + ".vault.azure.net";
  const client = new SecretClient(url, credential);

  await client.setSecret("secret-name-user", "secret-value-user");
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
