// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update certain properties of the Network Device resource.
 *
 * @summary update certain properties of the Network Device resource.
 * x-ms-original-file: 2025-07-15/NetworkDevices_Update.json
 */
async function networkDevicesUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkDevices.update("example-rg", "example-device", {
    tags: { KeyId: "KeyValue" },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/example-identity":
          {},
      },
    },
    annotation: "annotation",
    hostName: "NFA-Device",
    identitySelector: {
      identityType: "UserAssignedIdentity",
      userAssignedIdentityResourceId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/example-identity",
    },
    serialNumber: "Vendor;DCS-7280XXX-24;12.05;JPE2111XXXX",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkDevicesUpdateMaximumSetGen();
}

main().catch(console.error);
