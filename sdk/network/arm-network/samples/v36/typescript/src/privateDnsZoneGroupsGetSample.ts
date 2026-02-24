// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the private dns zone group resource by specified private dns zone group name.
 *
 * @summary Gets the private dns zone group resource by specified private dns zone group name.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PrivateEndpointDnsZoneGroupGet.json
 */
async function getPrivateDnsZoneGroup(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const privateEndpointName = "testPe";
  const privateDnsZoneGroupName = "testPdnsgroup";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateDnsZoneGroups.get(
    resourceGroupName,
    privateEndpointName,
    privateDnsZoneGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateDnsZoneGroup();
}

main().catch(console.error);
