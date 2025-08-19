// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Create or update a worker pool.
 *
 * @summary Description for Create or update a worker pool.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/AppServiceEnvironments_CreateOrUpdateWorkerPool.json
 */

import {
  WorkerPoolResource,
  WebSiteManagementClient,
} from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getPropertiesOfAWorkerPool(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "test-rg";
  const name = "test-ase";
  const workerPoolName = "0";
  const workerPoolEnvelope: WorkerPoolResource = {
    workerCount: 3,
    workerSize: "Small",
  };
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.updateWorkerPool(
    resourceGroupName,
    name,
    workerPoolName,
    workerPoolEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPropertiesOfAWorkerPool();
}

main().catch(console.error);
