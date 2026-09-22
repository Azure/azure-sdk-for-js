// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all Application Insights components within a subscription.
 *
 * @summary gets a list of all Application Insights components within a subscription.
 * x-ms-original-file: 2020-02-02/ComponentsList.json
 */
async function componentsListJson() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.components.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await componentsListJson();
}

main().catch(console.error);
