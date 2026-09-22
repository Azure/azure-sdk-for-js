// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the API Key for this key id.
 *
 * @summary get the API Key for this key id.
 * x-ms-original-file: 2015-05-01/APIKeysGet.json
 */
async function apiKeysGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.apiKeys.get(
    "my-resource-group",
    "my-component",
    "bb820f1b-3110-4a8b-ba2c-8c1129d7eb6a",
  );
  console.log(result);
}

async function main() {
  await apiKeysGet();
}

main().catch(console.error);
