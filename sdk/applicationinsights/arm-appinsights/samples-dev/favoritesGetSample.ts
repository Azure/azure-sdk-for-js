// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a single favorite by its FavoriteId, defined within an Application Insights component.
 *
 * @summary Get a single favorite by its FavoriteId, defined within an Application Insights component.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2015-05-01/examples/FavoriteGet.json
 */

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function favoriteGet(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const resourceName = "my-ai-component";
  const favoriteId = "deadb33f-5e0d-4064-8ebb-1a4ed0313eb2";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.favorites.get(
    resourceGroupName,
    resourceName,
    favoriteId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await favoriteGet();
}

main().catch(console.error);
