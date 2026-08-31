// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that the Azure Cosmos DB account name already exists. A valid account name may contain only lowercase letters, numbers, and the '-' character, and must be between 3 and 50 characters.
 *
 * @summary checks that the Azure Cosmos DB account name already exists. A valid account name may contain only lowercase letters, numbers, and the '-' character, and must be between 3 and 50 characters.
 * x-ms-original-file: 2026-03-15/CosmosDBDatabaseAccountCheckNameExists.json
 */
async function cosmosDBDatabaseAccountCheckNameExists() {
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential);
  const result = await client.databaseAccounts.checkNameExists("ddb1");
  console.log(result);
}

async function main() {
  await cosmosDBDatabaseAccountCheckNameExists();
}

main().catch(console.error);
