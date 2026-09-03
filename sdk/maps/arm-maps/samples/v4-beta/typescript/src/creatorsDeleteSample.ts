// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Maps Creator resource.
 *
 * @summary delete a Maps Creator resource.
 * x-ms-original-file: 2025-10-01-preview/DeleteMapsCreator.json
 */
async function deleteCreatorResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  await client.creators.delete("myResourceGroup", "myMapsAccount", "myCreator");
}

async function main(): Promise<void> {
  await deleteCreatorResource();
}

main().catch(console.error);
