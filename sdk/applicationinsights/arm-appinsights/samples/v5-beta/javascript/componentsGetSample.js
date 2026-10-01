// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns an Application Insights component.
 *
 * @summary returns an Application Insights component.
 * x-ms-original-file: 2020-02-02/ComponentsGet.json
 */
async function componentGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.components.get("my-resource-group", "my-component");
  console.log(result);
}

async function main() {
  await componentGet();
}

main().catch(console.error);
