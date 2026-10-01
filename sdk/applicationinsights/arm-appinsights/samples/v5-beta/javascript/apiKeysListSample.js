// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of API keys of an Application Insights component.
 *
 * @summary gets a list of API keys of an Application Insights component.
 * x-ms-original-file: 2015-05-01/APIKeysList.json
 */
async function apiKeysList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.apiKeys.list("my-resource-group", "my-component")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiKeysList();
}

main().catch(console.error);
