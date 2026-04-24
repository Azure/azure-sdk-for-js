// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a Data Transfer Job.
 *
 * @summary creates a Data Transfer Job.
 * x-ms-original-file: 2025-11-01-preview/data-transfer-service/CosmosDBDataTransferJobCreate.json
 */
async function cosmosDBDataTransferJobCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.dataTransferJobs.create("rg1", "ddb1", "j1", {
    properties: {
      destination: {
        component: "AzureBlobStorage",
        containerName: "blob_container",
        endpointUrl: "https://blob.windows.net",
      },
      source: { component: "CosmosDBCassandra", keyspaceName: "keyspace", tableName: "table" },
    },
  });
  console.log(result);
}

async function main() {
  await cosmosDBDataTransferJobCreate();
}

main().catch(console.error);
