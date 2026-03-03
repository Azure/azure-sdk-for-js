// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get metric definitions for a specific instance of a worker pool of an App Service Environment.
 *
 * @summary description for Get metric definitions for a specific instance of a worker pool of an App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_ListWorkerPoolInstanceMetricDefinitions.json
 */
async function getMetricDefinitionsForASpecificInstanceOfAWorkerPoolOfAnAppServiceEnvironment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceEnvironments.listWorkerPoolInstanceMetricDefinitions(
    "test-rg",
    "test-ase",
    "0",
    "10.8.0.7",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getMetricDefinitionsForASpecificInstanceOfAWorkerPoolOfAnAppServiceEnvironment();
}

main().catch(console.error);
