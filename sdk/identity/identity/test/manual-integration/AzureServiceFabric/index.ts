// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SecretClient } from "@azure/keyvault-secrets";
import { ManagedIdentityCredential } from "@azure/identity";

async function main(): Promise<void> {
  console.log("About to auth: ", process.env.AZURE_IDENTITY_TEST_MANAGED_IDENTITY_CLIENT_ID);
  // This will use the user managed identity in the environment called AZURE_IDENTITY_TEST_VAULT_URL
  const credential = new ManagedIdentityCredential(
    process.env.AZURE_IDENTITY_TEST_MANAGED_IDENTITY_CLIENT_ID!
  );
  //set a query param to make sure it doesn't validate the certificate for service fabric credential - fabricMsi - prepareRequestOptions method
  const url = process.env.AZURE_IDENTITY_TEST_VAULT_URL!;
  console.log("About to connect to: ", url);
  const client = new SecretClient(url, credential);
  const identityEndpoint = process.env.IDENTITY_ENDPOINT!;
  const identityHeader = process.env.IDENTITY_HEADER;
  const identityThumbprint = process.env.IDENTITY_SERVER_THUMBPRINT;
  console.log("identity Endpoint =", identityEndpoint);
  console.log("identity Header =", identityHeader);
  console.log("identity Thumbprint =", identityThumbprint);
  console.log("About to set secret");
  await client.setSecret("secret-name-pod", "secret-value-pod");
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
