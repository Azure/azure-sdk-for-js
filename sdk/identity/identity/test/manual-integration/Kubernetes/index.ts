// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SecretClient } from "@azure/keyvault-secrets";
import { ManagedIdentityCredential } from "@azure/identity";

async function main(): Promise<void> {
  console.log("About to auth: ", process.env.AZURE_IDENTITY_TEST_MANAGED_IDENTITY_CLIENT_ID);
  // This will use the user managed identity in the environment called AZURE_IDENTITY_TEST_MANAGED_IDENTITY_CLIENT_ID
  const credential = new ManagedIdentityCredential(
    process.env.AZURE_IDENTITY_TEST_MANAGED_IDENTITY_CLIENT_ID!
  );

  const url = process.env.AZURE_IDENTITY_TEST_VAULT_URL!;
  console.log("About to connect to: ", url);
  const client = new SecretClient(url, credential);

  console.log("About to set secret");
  await client.setSecret("secret-name-pod", "secret-value-pod");
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
