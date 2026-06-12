// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the base Settings of the target resource.
 *
 * @summary updates the base Settings of the target resource.
 * x-ms-original-file: 2025-09-16-preview/settings/SettingsUpdate.json
 */
async function settingsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.settings.update(
    "hybridRG",
    "Microsoft.HybridCompute",
    "machines",
    "testMachine",
    "default",
    {
      gatewayProperties: {
        gatewayResourceId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/gateways/newGateway",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await settingsUpdate();
}

main().catch(console.error);
