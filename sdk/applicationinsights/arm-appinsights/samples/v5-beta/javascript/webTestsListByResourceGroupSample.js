// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all Application Insights web tests defined for the specified resource group.
 *
 * @summary get all Application Insights web tests defined for the specified resource group.
 * x-ms-original-file: 2022-06-15/WebTestListByResourceGroup.json
 */
async function webTestListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webTests.listByResourceGroup("my-resource-group")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await webTestListByResourceGroup();
}

main().catch(console.error);
