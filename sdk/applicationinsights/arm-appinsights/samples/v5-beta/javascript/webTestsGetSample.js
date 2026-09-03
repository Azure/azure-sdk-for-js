// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific Application Insights web test definition.
 *
 * @summary get a specific Application Insights web test definition.
 * x-ms-original-file: 2022-06-15/WebTestGet.json
 */
async function webTestGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.webTests.get("my-resource-group", "my-webtest-01-mywebservice");
  console.log(result);
}

async function main() {
  await webTestGet();
}

main().catch(console.error);
