// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of service.
 *
 * @summary gets the status of service.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDataTransferServiceGet.json
 */
async function dataTransferServiceGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.get("rg1", "ddb1", "DataTransfer");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the status of service.
 *
 * @summary gets the status of service.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGraphAPIComputeServiceGet.json
 */
async function graphAPIComputeServiceGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.get("rg1", "ddb1", "GraphAPICompute");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the status of service.
 *
 * @summary gets the status of service.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMaterializedViewsBuilderServiceGet.json
 */
async function materializedViewsBuilderServiceGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.get("rg1", "ddb1", "MaterializedViewsBuilder");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the status of service.
 *
 * @summary gets the status of service.
 * x-ms-original-file: 2025-11-01-preview/services/sqldedicatedgateway/CosmosDBSqlDedicatedGatewayServiceGet.json
 */
async function sqlDedicatedGatewayServiceGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.get("rg1", "ddb1", "SqlDedicatedGateway");
  console.log(result);
}

async function main() {
  await dataTransferServiceGet();
  await graphAPIComputeServiceGet();
  await materializedViewsBuilderServiceGet();
  await sqlDedicatedGatewayServiceGet();
}

main().catch(console.error);
