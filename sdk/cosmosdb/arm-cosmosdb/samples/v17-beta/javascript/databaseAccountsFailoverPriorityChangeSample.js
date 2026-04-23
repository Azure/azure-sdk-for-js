// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to changes the failover priority for the Azure Cosmos DB database account. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists.
 *
 * @summary changes the failover priority for the Azure Cosmos DB database account. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseAccountFailoverPriorityChange.json
 */
async function cosmosDBDatabaseAccountFailoverPriorityChange() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.databaseAccounts.failoverPriorityChange("rg1", "ddb1-failover", {
    failoverPolicies: [
      { failoverPriority: 0, locationName: "eastus" },
      { failoverPriority: 1, locationName: "westus" },
    ],
  });
}

async function main() {
  await cosmosDBDatabaseAccountFailoverPriorityChange();
}

main().catch(console.error);
