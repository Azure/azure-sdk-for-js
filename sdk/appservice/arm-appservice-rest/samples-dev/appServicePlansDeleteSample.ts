/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
/**
 * This sample demonstrates how to Description for Delete an App Service plan.
 *
 * @summary Description for Delete an App Service plan.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/DeleteAppServicePlan.json
 */

import WebSiteManagementClient from "@azure-rest/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteAppServicePlan() {
  const subscriptionId = process.env.SUBSCRIPTION_ID as string;
  const resourceGroupName = "testrg123";
  const name = "testsf6141";
  const credential = new DefaultAzureCredential();
  const client = WebSiteManagementClient(credential);
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}",
      subscriptionId,
      resourceGroupName,
      name,
    )
    .delete();
  console.log(result);
}

deleteAppServicePlan().catch(console.error);
