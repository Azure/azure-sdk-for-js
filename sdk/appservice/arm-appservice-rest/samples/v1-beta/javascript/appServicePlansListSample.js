/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const WebSiteManagementClient = require("@azure-rest/arm-appservice").default,
  { paginate } = require("@azure-rest/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Description for Get all App Service plans for a subscription.
 *
 * @summary Description for Get all App Service plans for a subscription.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2021-03-01/examples/ListAppServicePlans.json
 */
async function listAppServicePlans() {
  const subscriptionId = process.env.SUBSCRIPTION_ID;
  const credential = new DefaultAzureCredential();
  const client = WebSiteManagementClient(credential);
  const result = [];
  const initialResposne = await client
    .path("/subscriptions/{subscriptionId}/providers/Microsoft.Web/serverfarms", subscriptionId)
    .get();
  const res = paginate(client, initialResposne);
  for await (let item of res) {
    result.push(item);
  }
  console.log(result);
}

listAppServicePlans().catch(console.error);
