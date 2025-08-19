// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all sites in the configuration group value in a subscription.
 *
 * @summary Lists all sites in the configuration group value in a subscription.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/ConfigurationGroupValueListBySubscription.json
 */

import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllHybridNetworkSitesInASubscription(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurationGroupValues.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllHybridNetworkSitesInASubscription();
}

main().catch(console.error);
