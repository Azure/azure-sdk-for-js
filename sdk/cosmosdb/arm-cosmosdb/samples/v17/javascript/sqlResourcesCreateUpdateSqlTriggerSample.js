// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB SQL trigger
 *
 * @summary create or update an Azure Cosmos DB SQL trigger
 * x-ms-original-file: 2026-03-15/CosmosDBSqlTriggerCreateUpdate.json
 */
async function cosmosDBSqlTriggerCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.createUpdateSqlTrigger(
    "rg1",
    "ddb1",
    "databaseName",
    "containerName",
    "triggerName",
    {
      resource: {
        id: "triggerName",
        body: "body",
        triggerType: "triggerType",
        triggerOperation: "triggerOperation",
      },
      options: {},
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBSqlTriggerCreateUpdate();
}

main().catch(console.error);
