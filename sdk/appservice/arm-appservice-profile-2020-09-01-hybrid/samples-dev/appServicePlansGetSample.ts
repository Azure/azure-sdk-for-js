// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get an App Service plan.
 *
 * @summary Get an App Service plan.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2018-02-01/examples/GetAppServicePlan.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAppServicePlan(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "testrg123";
  const name = "testsf6141";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServicePlans.get(resourceGroupName, name);
  console.log(result);
}

async function main(): Promise<void> {
  await getAppServicePlan();
}

main().catch(console.error);
