// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update certain properties of the Network Bootstrap Device resource.
 *
 * @summary update certain properties of the Network Bootstrap Device resource.
 * x-ms-original-file: 2026-01-15-preview/NetworkBootstrapDevices_Update.json
 */
async function networkBootstrapDevicesUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapDevices.update("example-rg", "example-device", {
    tags: {},
    identity: { type: "None", userAssignedIdentities: { key8793: {} } },
    annotation: "annotation",
    hostName: "NFA-Device",
    serialNumber: "Vendor;DCS-7280XXX-24;12.05;JPE2111XXXX",
    controlPlaneAcls: [
      "/subscriptions/xxxxxx/resourceGroups/resourcegroupname/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
    ],
  });
  console.log(result);
}

async function main() {
  await networkBootstrapDevicesUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
