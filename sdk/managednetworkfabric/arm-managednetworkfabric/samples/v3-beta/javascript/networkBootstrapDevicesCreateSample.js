// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a Network Bootstrap Device resource
 *
 * @summary creates a Network Bootstrap Device resource
 * x-ms-original-file: 2026-01-15-preview/NetworkBootstrapDevices_Create.json
 */
async function networkBootstrapDevicesCreateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapDevices.create("example-rg", "example-device", {
    annotation: "annotation",
    hostName: "NFA-Device",
    serialNumber: "Vendor;DCS-7280XXX-24;12.05;JPE2111XXXX",
    networkDeviceSku: "DeviceSku",
    controlPlaneAcls: [
      "/subscriptions/xxxxxx/resourceGroups/resourcegroupname/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
    ],
    identity: { type: "None", userAssignedIdentities: { key3673: {} } },
    tags: {},
    location: "eastuseuap",
  });
  console.log(result);
}

async function main() {
  await networkBootstrapDevicesCreateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
