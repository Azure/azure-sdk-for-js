// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMapsManagementClient } from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Maps Creator resource. Only a subset of the parameters may be updated after creation, such as Tags.
 *
 * @summary updates the Maps Creator resource. Only a subset of the parameters may be updated after creation, such as Tags.
 * x-ms-original-file: 2025-10-01-preview/UpdateMapsCreator.json
 */
async function updateCreatorResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.creators.update("myResourceGroup", "myMapsAccount", "myCreator", {
    storageUnits: 10,
    tags: { specialTag: "true" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateCreatorResource();
}

main().catch(console.error);
