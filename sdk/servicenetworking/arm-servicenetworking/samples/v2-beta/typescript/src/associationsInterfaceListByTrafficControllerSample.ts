// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Association resources by TrafficController
 *
 * @summary list Association resources by TrafficController
 * x-ms-original-file: 2025-03-01-preview/AssociationsGet.json
 */
async function getAssociations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.associationsInterface.listByTrafficController("rg1", "tc1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAssociations();
}

main().catch(console.error);
