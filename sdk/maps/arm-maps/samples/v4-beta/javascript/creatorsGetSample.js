// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Maps Creator resource.
 *
 * @summary get a Maps Creator resource.
 * x-ms-original-file: 2025-10-01-preview/GetMapsCreator.json
 */
async function getCreatorResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.creators.get("myResourceGroup", "myMapsAccount", "myCreator");
  console.log(result);
}

async function main() {
  await getCreatorResource();
}

main().catch(console.error);
