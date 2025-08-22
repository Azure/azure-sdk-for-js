// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the connectors in the specified hub.
 *
 * @summary Gets all the connectors in the specified hub.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/ConnectorsListByHub.json
 */

import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function connectorsListByHub(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectors.listByHub(resourceGroupName, hubName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

connectorsListByHub().catch(console.error);
