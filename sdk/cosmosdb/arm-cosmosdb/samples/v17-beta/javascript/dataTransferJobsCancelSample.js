// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels a Data Transfer Job.
 *
 * @summary cancels a Data Transfer Job.
 * x-ms-original-file: 2025-11-01-preview/data-transfer-service/CosmosDBDataTransferJobCancel.json
 */
async function cosmosDBDataTransferJobCancel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.dataTransferJobs.cancel("rg1", "ddb1", "j1");
  console.log(result);
}

async function main() {
  await cosmosDBDataTransferJobCancel();
}

main().catch(console.error);
