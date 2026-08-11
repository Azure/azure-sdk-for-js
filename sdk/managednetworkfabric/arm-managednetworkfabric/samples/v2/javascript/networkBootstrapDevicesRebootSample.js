// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reboot the Network Bootstrap Device.
 *
 * @summary reboot the Network Bootstrap Device.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapDevices_Reboot.json
 */
async function networkBootstrapDevicesRebootMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapDevices.reboot("example-rg", "example-device");
  console.log(result);
}

async function main() {
  await networkBootstrapDevicesRebootMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
