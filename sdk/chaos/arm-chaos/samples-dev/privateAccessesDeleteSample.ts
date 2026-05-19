// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a private access
 *
 * @summary delete a private access
 * x-ms-original-file: 2026-05-01-preview/PrivateAccesses_Delete.json
 */
async function deleteAPrivateAccessResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.privateAccesses.delete("myResourceGroup", "myPrivateAccess");
}

async function main(): Promise<void> {
  await deleteAPrivateAccessResource();
}

main().catch(console.error);
