// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to migrate the resources into Namespace
 *
 * @summary migrate the resources into Namespace
 * x-ms-original-file: 2025-10-01/Migrate_Assets_Namespace.json
 */
async function namespaceMigrate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaces.migrate("myResourceGroup", "my-namespace-1", {
    scope: "Resources",
    resourceIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.DeviceRegistry/assets/my-asset-1",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.DeviceRegistry/assets/my-asset-2",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.DeviceRegistry/assets/my-asset-3",
    ],
  });
}

async function main(): Promise<void> {
  await namespaceMigrate();
}

main().catch(console.error);
