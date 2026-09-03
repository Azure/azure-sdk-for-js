// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove a favorite that is associated to an Application Insights component.
 *
 * @summary remove a favorite that is associated to an Application Insights component.
 * x-ms-original-file: 2015-05-01/FavoriteDelete.json
 */
async function favoriteList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  await client.favorites.delete(
    "my-resource-group",
    "my-ai-component",
    "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2",
  );
}

async function main() {
  await favoriteList();
}

main().catch(console.error);
