/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import WebSiteManagementClient, {
  AppServicePlansUpdateParameters,
} from "@azure-rest/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Description for Creates or updates an App Service Plan.
 *
 * @summary Description for Creates or updates an App Service Plan.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/PatchAppServicePlan.json
 */
async function patchServicePlan() {
  const subscriptionId = process.env.SUBSCRIPTION_ID as string;
  const resourceGroupName = "testrg123";
  const name = "testsf6141";
  const appServicePlan: AppServicePlansUpdateParameters = { body: { kind: "app" } };
  const credential = new DefaultAzureCredential();
  const client = WebSiteManagementClient(credential);
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}",
      subscriptionId,
      resourceGroupName,
      name
    )
    .patch(appServicePlan);
  console.log(result);
}

patchServicePlan().catch(console.error);
