// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedServiceIdentityClient } = require("@azure/arm-msi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the federated identity credentials under the specified user assigned identity.
 *
 * @summary lists all the federated identity credentials under the specified user assigned identity.
 * x-ms-original-file: 2025-05-31-preview/FederatedIdentityCredentialList.json
 */
async function federatedIdentityCredentialList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c267c0e7-0a73-4789-9e17-d26aeb0904e5";
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.federatedIdentityCredentials.list("rgName", "resourceName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await federatedIdentityCredentialList();
}

main().catch(console.error);
