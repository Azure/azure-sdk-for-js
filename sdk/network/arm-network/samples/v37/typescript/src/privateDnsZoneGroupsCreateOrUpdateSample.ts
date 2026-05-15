// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a private dns zone group in the specified private endpoint.
 *
 * @summary creates or updates a private dns zone group in the specified private endpoint.
 * x-ms-original-file: 2025-05-01/PrivateEndpointDnsZoneGroupCreate.json
 */
async function createPrivateDnsZoneGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateDnsZoneGroups.createOrUpdate(
    "rg1",
    "testPe",
    "testPdnsgroup",
    {
      privateDnsZoneConfigs: [
        {
          privateDnsZoneId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/privateDnsZones/zone1.com",
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createPrivateDnsZoneGroup();
}

main().catch(console.error);
