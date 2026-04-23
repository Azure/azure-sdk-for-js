// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes service with the given serviceName.
 *
 * @summary deletes service with the given serviceName.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDataTransferServiceDelete.json
 */
async function dataTransferServiceDelete(): Promise<void> {
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
async function graphAPIComputeServiceDelete(): Promise<void> {
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
async function materializedViewsBuilderServiceDelete(): Promise<void> {
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
async function sqlDedicatedGatewayServiceDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.service.delete("rg1", "ddb1", "SqlDedicatedGateway");
}

async function main(): Promise<void> {
  await dataTransferServiceDelete();
  await graphAPIComputeServiceDelete();
  await materializedViewsBuilderServiceDelete();
  await sqlDedicatedGatewayServiceDelete();
}

main().catch(console.error);
