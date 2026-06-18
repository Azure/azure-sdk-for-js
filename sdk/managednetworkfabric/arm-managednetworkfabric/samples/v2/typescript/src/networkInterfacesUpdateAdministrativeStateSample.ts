// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the admin state of the Network Interface.
 *
 * @summary update the admin state of the Network Interface.
 * x-ms-original-file: 2025-07-15/NetworkInterfaces_UpdateAdministrativeState.json
 */
async function networkInterfacesUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkInterfaces.updateAdministrativeState(
    "example-rg",
    "example-device",
    "example-interface",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkInterfacesUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
