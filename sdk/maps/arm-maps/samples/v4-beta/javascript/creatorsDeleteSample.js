// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Maps Creator resource.
 *
 * @summary delete a Maps Creator resource.
 * x-ms-original-file: 2025-10-01-preview/DeleteMapsCreator.json
 */
async function deleteCreatorResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  await client.creators.delete("myResourceGroup", "myMapsAccount", "myCreator");
}

async function main() {
  await deleteCreatorResource();
}

main().catch(console.error);
