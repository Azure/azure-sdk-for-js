// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Administrative state of the Network Bootstrap Device.
 *
 * @summary updates the Administrative state of the Network Bootstrap Device.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapDevices_UpdateAdministrativeState.json
 */
async function networkBootstrapDevicesUpdateAdministrativeStateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapDevices.updateAdministrativeState(
    "example-rg",
    "example-device",
    {
      resourceIds: [
        "/Subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkBootstrapDevices/example-device-1",
      ],
      state: "RMA",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkBootstrapDevicesUpdateAdministrativeStateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
