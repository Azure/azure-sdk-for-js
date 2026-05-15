// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all private dns zone groups in a private endpoint.
 *
 * @summary gets all private dns zone groups in a private endpoint.
 * x-ms-original-file: 2025-05-01/PrivateEndpointDnsZoneGroupList.json
 */
async function listPrivateEndpointsInResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateDnsZoneGroups.list("rg1", "testPe")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listPrivateEndpointsInResourceGroup();
}

main().catch(console.error);
