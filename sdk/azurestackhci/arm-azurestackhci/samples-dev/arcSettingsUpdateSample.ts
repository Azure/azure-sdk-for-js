// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update ArcSettings for HCI cluster.
 *
 * @summary update ArcSettings for HCI cluster.
 * x-ms-original-file: 2025-12-01-preview/PatchArcSetting.json
 */
async function patchArcSetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.arcSettings.update("test-rg", "myCluster", "default", {
    connectivityProperties: {
      enabled: true,
      serviceConfigurations: [{ port: 6516, serviceName: "WAC" }],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchArcSetting();
}

main().catch(console.error);
