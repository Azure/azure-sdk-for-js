// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists associations for the specified data collection endpoint.
 *
 * @summary lists associations for the specified data collection endpoint.
 * x-ms-original-file: 2024-03-11/DataCollectionRuleAssociationsListByDataCollectionEndpoint.json
 */
async function listAssociationsForSpecifiedDataCollectionEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataCollectionRuleAssociations.listByDataCollectionEndpoint(
    "myResourceGroup",
    "myDataCollectionEndpointName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAssociationsForSpecifiedDataCollectionEndpoint();
}

main().catch(console.error);
