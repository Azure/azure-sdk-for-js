/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */
/**
 * This sample demonstrates how to Description for Get all App Service plans in a resource group.
 *
 * @summary Description for Get all App Service plans in a resource group.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/ListAppServicePlansByResourceGroup.json
 */

import WebSiteManagementClient, { paginate } from "@azure-rest/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

async function listAppServicePlansByResourceGroup() {
  const subscriptionId = process.env.SUBSCRIPTION_ID as string;
  const resourceGroupName = "testrg123";
  const credential = new DefaultAzureCredential();
  const client = WebSiteManagementClient(credential);
  const result = [];
  const initialResposne = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms",
      subscriptionId,
      resourceGroupName,
    )
    .get();
  const res = paginate(client, initialResposne);
  for await (const item of res) {
    result.push(item);
  }
  console.log(result);
}

listAppServicePlansByResourceGroup().catch(console.error);
