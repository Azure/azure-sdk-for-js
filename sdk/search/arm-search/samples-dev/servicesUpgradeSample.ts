// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Upgrades the Azure AI Search service to the latest version available.
 *
 * @summary Upgrades the Azure AI Search service to the latest version available.
 * x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2025-05-01/examples/UpgradeSearchServiceToLatestVersion.json
 */

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function upgradeSearchServiceToLatestVersion(): Promise<void> {
  const subscriptionId = process.env["SEARCH_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["SEARCH_RESOURCE_GROUP"] || "rg1";
  const searchServiceName = "mysearchservice";
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.beginUpgradeAndWait(
    resourceGroupName,
    searchServiceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await upgradeSearchServiceToLatestVersion();
}

main().catch(console.error);
