// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the predictions in the specified hub.
 *
 * @summary Gets all the predictions in the specified hub.
 * x-ms-original-file: specification/customer-insights/resource-manager/Microsoft.CustomerInsights/stable/2017-04-26/examples/PredictionsListByHub.json
 */

import { CustomerInsightsManagementClient } from "@azure/arm-customerinsights";
import { DefaultAzureCredential } from "@azure/identity";

async function predictionsListByHub(): Promise<void> {
  const subscriptionId = "c909e979-ef71-4def-a970-bc7c154db8c5";
  const resourceGroupName = "TestHubRG";
  const hubName = "sdkTestHub";
  const credential = new DefaultAzureCredential();
  const client = new CustomerInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.predictions.listByHub(resourceGroupName, hubName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

predictionsListByHub().catch(console.error);
