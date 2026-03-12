// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists available operations for the Microsoft.ManagedIdentity provider
 *
 * @summary Lists available operations for the Microsoft.ManagedIdentity provider
 * x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/MsiOperationsList.json
 */

import { ManagedServiceIdentityClient } from "@azure/arm-msi";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function msiOperationsList(): Promise<void> {
  const subscriptionId =
    process.env["MSI_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await msiOperationsList();
}

main().catch(console.error);
