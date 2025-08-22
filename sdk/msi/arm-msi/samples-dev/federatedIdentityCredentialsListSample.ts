// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the federated identity credentials under the specified user assigned identity.
 *
 * @summary Lists all the federated identity credentials under the specified user assigned identity.
 * x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/FederatedIdentityCredentialList.json
 */

import { ManagedServiceIdentityClient } from "@azure/arm-msi";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function federatedIdentityCredentialList(): Promise<void> {
  const subscriptionId =
    process.env["MSI_SUBSCRIPTION_ID"] ||
    "c267c0e7-0a73-4789-9e17-d26aeb0904e5";
  const resourceGroupName = process.env["MSI_RESOURCE_GROUP"] || "rgName";
  const resourceName = "resourceName";
  const credential = new DefaultAzureCredential();
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.federatedIdentityCredentials.list(
    resourceGroupName,
    resourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await federatedIdentityCredentialList();
}

main().catch(console.error);
