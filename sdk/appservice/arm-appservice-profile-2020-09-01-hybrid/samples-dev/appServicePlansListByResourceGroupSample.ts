// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get all App Service plans in a resource group.
 *
 * @summary Get all App Service plans in a resource group.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2018-02-01/examples/ListAppServicePlansByResourceGroup.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAppServicePlansByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appServicePlans.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAppServicePlansByResourceGroup();
}

main().catch(console.error);
