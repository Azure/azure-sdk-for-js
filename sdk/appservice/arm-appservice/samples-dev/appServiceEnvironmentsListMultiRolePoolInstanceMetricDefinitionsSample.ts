// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Get metric definitions for a specific instance of a multi-role pool of an App Service Environment.
 *
 * @summary Description for Get metric definitions for a specific instance of a multi-role pool of an App Service Environment.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/AppServiceEnvironments_ListMultiRolePoolInstanceMetricDefinitions.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getMetricDefinitionsForASpecificInstanceOfAMultiRolePoolOfAnAppServiceEnvironment(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "test-rg";
  const name = "test-ase";
  const instance = "10.7.1.8";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServiceEnvironments.listMultiRolePoolInstanceMetricDefinitions(
    resourceGroupName,
    name,
    instance,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getMetricDefinitionsForASpecificInstanceOfAMultiRolePoolOfAnAppServiceEnvironment();
}

main().catch(console.error);
