// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list PrivateLinkResource resources by TrafficController
 *
 * @summary list PrivateLinkResource resources by TrafficController
 * x-ms-original-file: 2026-03-01/PrivateLinkResourcesGet.json
 */
async function getPrivateLinkResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResourcesInterface.listByTrafficController(
    "rg1",
    "tc1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getPrivateLinkResources();
}

main().catch(console.error);
