// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PrivateDnsZoneGroup} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a private dns zone group in the specified private endpoint.
 *
 * @summary Creates or updates a private dns zone group in the specified private endpoint.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PrivateEndpointDnsZoneGroupCreate.json
 */
async function createPrivateDnsZoneGroup(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const privateEndpointName = "testPe";
  const privateDnsZoneGroupName = "testPdnsgroup";
  const parameters: PrivateDnsZoneGroup = {
    privateDnsZoneConfigs: [
      {
        privateDnsZoneId:
          "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/privateDnsZones/zone1.com",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateDnsZoneGroups.beginCreateOrUpdateAndWait(
    resourceGroupName,
    privateEndpointName,
    privateDnsZoneGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createPrivateDnsZoneGroup();
}

main().catch(console.error);
