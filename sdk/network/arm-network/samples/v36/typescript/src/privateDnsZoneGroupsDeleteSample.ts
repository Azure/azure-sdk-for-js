// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified private dns zone group.
 *
 * @summary Deletes the specified private dns zone group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PrivateEndpointDnsZoneGroupDelete.json
 */
async function deletePrivateDnsZoneGroup(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const privateEndpointName = "testPe";
  const privateDnsZoneGroupName = "testPdnsgroup";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateDnsZoneGroups.beginDeleteAndWait(
    resourceGroupName,
    privateEndpointName,
    privateDnsZoneGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deletePrivateDnsZoneGroup();
}

main().catch(console.error);
