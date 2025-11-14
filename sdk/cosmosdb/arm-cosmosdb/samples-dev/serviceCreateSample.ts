// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ServiceResourceCreateUpdateParameters} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a service.
 *
 * @summary Creates a service.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBDataTransferServiceCreate.json
 */
async function dataTransferServiceCreate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const serviceName = "DataTransfer";
  const createUpdateParameters: ServiceResourceCreateUpdateParameters = {
    properties: {
      instanceCount: 1,
      instanceSize: "Cosmos.D4s",
      serviceType: "DataTransfer",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.beginCreateAndWait(
    resourceGroupName,
    accountName,
    serviceName,
    createUpdateParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a service.
 *
 * @summary Creates a service.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBGraphAPIComputeServiceCreate.json
 */
async function graphApiComputeServiceCreate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const serviceName = "GraphAPICompute";
  const createUpdateParameters: ServiceResourceCreateUpdateParameters = {
    properties: {
      instanceCount: 1,
      instanceSize: "Cosmos.D4s",
      serviceType: "GraphAPICompute",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.beginCreateAndWait(
    resourceGroupName,
    accountName,
    serviceName,
    createUpdateParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a service.
 *
 * @summary Creates a service.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBMaterializedViewsBuilderServiceCreate.json
 */
async function materializedViewsBuilderServiceCreate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const serviceName = "MaterializedViewsBuilder";
  const createUpdateParameters: ServiceResourceCreateUpdateParameters = {
    properties: {
      instanceCount: 1,
      instanceSize: "Cosmos.D4s",
      serviceType: "MaterializedViewsBuilder",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.beginCreateAndWait(
    resourceGroupName,
    accountName,
    serviceName,
    createUpdateParameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a service.
 *
 * @summary Creates a service.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/services/sqldedicatedgateway/CosmosDBSqlDedicatedGatewayServiceCreate.json
 */
async function sqlDedicatedGatewayServiceCreate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const serviceName = "SqlDedicatedGateway";
  const createUpdateParameters: ServiceResourceCreateUpdateParameters = {
    properties: {
      dedicatedGatewayType: "IntegratedCache",
      instanceCount: 1,
      instanceSize: "Cosmos.D4s",
      serviceType: "SqlDedicatedGateway",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.service.beginCreateAndWait(
    resourceGroupName,
    accountName,
    serviceName,
    createUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dataTransferServiceCreate();
  await graphApiComputeServiceCreate();
  await materializedViewsBuilderServiceCreate();
  await sqlDedicatedGatewayServiceCreate();
}

main().catch(console.error);
