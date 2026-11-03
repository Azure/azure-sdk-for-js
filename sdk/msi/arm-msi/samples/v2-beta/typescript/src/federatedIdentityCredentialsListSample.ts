// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedServiceIdentityClient } from "@azure/arm-msi";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the federated identity credentials under the specified user assigned identity.
 *
 * @summary lists all the federated identity credentials under the specified user assigned identity.
 * x-ms-original-file: 2025-05-31-preview/FederatedIdentityCredentialList.json
 */
async function federatedIdentityCredentialList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c267c0e7-0a73-4789-9e17-d26aeb0904e5";
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.federatedIdentityCredentials.list("rgName", "resourceName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await federatedIdentityCredentialList();
}

main().catch(console.error);
