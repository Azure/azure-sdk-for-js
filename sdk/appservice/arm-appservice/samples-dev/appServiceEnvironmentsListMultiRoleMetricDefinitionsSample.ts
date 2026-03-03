// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get metric definitions for a multi-role pool of an App Service Environment.
 *
 * @summary description for Get metric definitions for a multi-role pool of an App Service Environment.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_ListMultiRoleMetricDefinitions.json
 */
async function getMetricDefinitionsForAMultiRolePoolOfAnAppServiceEnvironment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceEnvironments.listMultiRoleMetricDefinitions(
    "test-rg",
    "test-ase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getMetricDefinitionsForAMultiRolePoolOfAnAppServiceEnvironment();
}

main().catch(console.error);
