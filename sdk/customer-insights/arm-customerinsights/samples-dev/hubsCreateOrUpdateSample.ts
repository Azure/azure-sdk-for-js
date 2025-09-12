// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a hub, or updates an existing hub.
 *
 * @summary Creates a hub, or updates an existing hub.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/HubsCreateOrUpdate.json
 */

import type { Hub } from "@azure/arm-customerinsights";
import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function hubsCreateOrUpdate(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const parameters: Hub = {
    hubBillingInfo: { maxUnits: 5, minUnits: 1, skuName: "B0" },
    location: "West US",
  };
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const result = await client.hubs.createOrUpdate(resourceGroupName, hubName, parameters);
  console.log(result);
}

hubsCreateOrUpdate().catch(console.error);
