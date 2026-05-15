// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified private dns zone group.
 *
 * @summary deletes the specified private dns zone group.
 * x-ms-original-file: 2025-05-01/PrivateEndpointDnsZoneGroupDelete.json
 */
async function deletePrivateDnsZoneGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.privateDnsZoneGroups.delete("rg1", "testPe", "testPdnsgroup");
}

async function main(): Promise<void> {
  await deletePrivateDnsZoneGroup();
}

main().catch(console.error);
