// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all Application Insights web test definitions for the specified subscription.
 *
 * @summary get all Application Insights web test definitions for the specified subscription.
 * x-ms-original-file: 2022-06-15/WebTestList.json
 */
async function webTestList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webTests.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await webTestList();
}

main().catch(console.error);
