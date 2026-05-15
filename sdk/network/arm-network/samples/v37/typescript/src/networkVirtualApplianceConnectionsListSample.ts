// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists NetworkVirtualApplianceConnections under the NVA.
 *
 * @summary lists NetworkVirtualApplianceConnections under the NVA.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceConnectionList.json
 */
async function networkVirtualApplianceConnectionList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkVirtualApplianceConnections.list("rg1", "nva1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkVirtualApplianceConnectionList();
}

main().catch(console.error);
