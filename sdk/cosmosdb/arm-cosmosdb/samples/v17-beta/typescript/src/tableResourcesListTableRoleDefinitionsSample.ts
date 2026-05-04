// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the list of all Azure Cosmos DB Table Role Definitions.
 *
 * @summary retrieves the list of all Azure Cosmos DB Table Role Definitions.
 * x-ms-original-file: 2025-11-01-preview/tablerbac/CosmosDBTableRoleDefinitionList.json
 */
async function cosmosDBTableRoleDefinitionList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.tableResources.listTableRoleDefinitions(
    "myResourceGroupName",
    "myAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBTableRoleDefinitionList();
}

main().catch(console.error);
