// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a link in the hub.
 *
 * @summary Deletes a link in the hub.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/LinksDelete.json
 */

import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function linksDelete(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const linkName = "linkTest4806";
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const result = await client.links.delete(resourceGroupName, hubName, linkName);
  console.log(result);
}

linksDelete().catch(console.error);
