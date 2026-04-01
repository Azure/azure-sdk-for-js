// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Network Device resource
 *
 * @summary create a Network Device resource
 * x-ms-original-file: 2025-07-15/NetworkDevices_Create.json
 */
async function networkDevicesCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkDevices.create("example-rg", "example-device", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/example-identity":
          {},
      },
    },
    annotation: "annotation",
    hostName: "NFA-Device",
    serialNumber: "Vendor;DCS-7280XXX-24;12.05;JPE2111XXXX",
    networkDeviceSku: "DeviceSku",
    identitySelector: {
      identityType: "UserAssignedIdentity",
      userAssignedIdentityResourceId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourcegroups/example-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/example-identity",
    },
    tags: { KeyId: "KeyValue" },
    location: "eastuseuap",
  });
  console.log(result);
}

async function main() {
  await networkDevicesCreateMaximumSetGen();
}

main().catch(console.error);
