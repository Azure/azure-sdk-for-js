// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a service.
 *
 * @summary creates a service.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDataTransferServiceCreate.json
 */
async function dataTransferServiceCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.create("rg1", "ddb1", "DataTransfer", {
    properties: { instanceCount: 1, instanceSize: "Cosmos.D4s", serviceType: "DataTransfer" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a service.
 *
 * @summary creates a service.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGraphAPIComputeServiceCreate.json
 */
async function graphAPIComputeServiceCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.create("rg1", "ddb1", "GraphAPICompute", {
    properties: { instanceCount: 1, instanceSize: "Cosmos.D4s", serviceType: "GraphAPICompute" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a service.
 *
 * @summary creates a service.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBMaterializedViewsBuilderServiceCreate.json
 */
async function materializedViewsBuilderServiceCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.create("rg1", "ddb1", "MaterializedViewsBuilder", {
    properties: {
      instanceCount: 1,
      instanceSize: "Cosmos.D4s",
      serviceType: "MaterializedViewsBuilder",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a service.
 *
 * @summary creates a service.
 * x-ms-original-file: 2025-11-01-preview/services/sqldedicatedgateway/CosmosDBSqlDedicatedGatewayServiceCreate.json
 */
async function sqlDedicatedGatewayServiceCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.create("rg1", "ddb1", "SqlDedicatedGateway", {
    properties: {
      dedicatedGatewayType: "IntegratedCache",
      instanceCount: 1,
      instanceSize: "Cosmos.D4s",
      serviceType: "SqlDedicatedGateway",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await dataTransferServiceCreate();
  await graphAPIComputeServiceCreate();
  await materializedViewsBuilderServiceCreate();
  await sqlDedicatedGatewayServiceCreate();
}

main().catch(console.error);
