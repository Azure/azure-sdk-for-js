// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a single favorite by its FavoriteId, defined within an Application Insights component.
 *
 * @summary get a single favorite by its FavoriteId, defined within an Application Insights component.
 * x-ms-original-file: 2015-05-01/FavoriteGet.json
 */
async function favoriteGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.favorites.get(
    "my-resource-group",
    "my-ai-component",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
  );
  console.log(result);
}

async function main() {
  await favoriteGet();
}

main().catch(console.error);
