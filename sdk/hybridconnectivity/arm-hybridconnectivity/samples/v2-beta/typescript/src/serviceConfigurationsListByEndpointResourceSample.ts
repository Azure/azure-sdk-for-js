// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to enumerate registered services in service configurations under a Endpoint Resource
 *
 * @summary aPI to enumerate registered services in service configurations under a Endpoint Resource
 * x-ms-original-file: 2024-12-01/ServiceConfigurationsList.json
 */
async function getClustersExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serviceConfigurations.listByEndpointResource(
    "subscriptions/f5bcc1d9-23af-4ae9-aca1-041d0f593a63/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/machines/testMachine/providers/Microsoft.HybridConnectivity/endpoints/default",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getClustersExample();
}

main().catch(console.error);
