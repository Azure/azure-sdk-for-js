// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedServiceIdentityClient } = require("@azure/arm-msi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the federated identity credential.
 *
 * @summary deletes the federated identity credential.
 * x-ms-original-file: 2025-05-31-preview/FederatedIdentityCredentialDelete.json
 */
async function federatedIdentityCredentialDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c267c0e7-0a73-4789-9e17-d26aeb0904e5";
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  await client.federatedIdentityCredentials.delete("rgName", "resourceName", "ficResourceName");
}

async function main() {
  await federatedIdentityCredentialDelete();
}

main().catch(console.error);
