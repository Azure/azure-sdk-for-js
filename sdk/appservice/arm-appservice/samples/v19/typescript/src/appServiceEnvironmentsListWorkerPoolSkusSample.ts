// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get available SKUs for scaling a worker pool.
 *
 * @summary description for Get available SKUs for scaling a worker pool.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_ListWorkerPoolSkus.json
 */
async function getAvailableSKUsForScalingAWorkerPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceEnvironments.listWorkerPoolSkus(
    "test-rg",
    "test-ase",
    "workerPool1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAvailableSKUsForScalingAWorkerPool();
}

main().catch(console.error);
