// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all interactions in the hub.
 *
 * @summary Gets all interactions in the hub.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/InteractionsListByHub.json
 */

import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function interactionsListByHub(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.interactions.listByHub(resourceGroupName, hubName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

interactionsListByHub().catch(console.error);
