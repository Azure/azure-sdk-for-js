// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes service with the given serviceName.
 *
 * @summary deletes service with the given serviceName.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDataTransferServiceDelete.json
 */
async function dataTransferServiceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.service.delete("rg1", "ddb1", "DataTransfer");
}

/**
 * This sample demonstrates how to deletes service with the given serviceName.
 *
 * @summary deletes service with the given serviceName.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGraphAPIComputeServiceDelete.json
 */
async function graphAPIComputeServiceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.service.delete("rg1", "ddb1", "GraphAPICompute");
}

/**
 * This sample demonstrates how to deletes service with the given serviceName.
 *
 * @summary deletes service with the given serviceName.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMaterializedViewsBuilderServiceDelete.json
 */
async function materializedViewsBuilderServiceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.service.delete("rg1", "ddb1", "MaterializedViewsBuilder");
}

/**
 * This sample demonstrates how to deletes service with the given serviceName.
 *
 * @summary deletes service with the given serviceName.
 * x-ms-original-file: 2025-11-01-preview/services/sqldedicatedgateway/CosmosDBSqlDedicatedGatewayServiceDelete.json
 */
async function sqlDedicatedGatewayServiceDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.service.delete("rg1", "ddb1", "SqlDedicatedGateway");
}

async function main() {
  await dataTransferServiceDelete();
  await graphAPIComputeServiceDelete();
  await materializedViewsBuilderServiceDelete();
  await sqlDedicatedGatewayServiceDelete();
}

main().catch(console.error);
