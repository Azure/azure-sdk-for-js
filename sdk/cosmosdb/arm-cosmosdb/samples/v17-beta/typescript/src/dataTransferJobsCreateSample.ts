// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CreateJobRequest} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a Data Transfer Job.
 *
 * @summary Creates a Data Transfer Job.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/data-transfer-service/CosmosDBDataTransferJobCreate.json
 */
async function cosmosDbDataTransferJobCreate(): Promise<void> {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const jobName = "j1";
  const jobCreateParameters: CreateJobRequest = {
    properties: {
      destination: {
        component: "AzureBlobStorage",
        containerName: "blob_container",
        endpointUrl: "https://blob.windows.net",
      },
      source: {
        component: "CosmosDBCassandra",
        keyspaceName: "keyspace",
        tableName: "table",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.dataTransferJobs.create(
    resourceGroupName,
    accountName,
    jobName,
    jobCreateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbDataTransferJobCreate();
}

main().catch(console.error);
