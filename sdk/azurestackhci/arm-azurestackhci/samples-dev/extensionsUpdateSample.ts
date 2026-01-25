// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Extension for HCI cluster.
 *
 * @summary update Extension for HCI cluster.
 * x-ms-original-file: 2025-12-01-preview/PatchExtension.json
 */
async function updateArcExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.extensions.update(
    "test-rg",
    "myCluster",
    "default",
    "MicrosoftMonitoringAgent",
    {
      extensionParameters: {
        enableAutomaticUpgrade: false,
        protectedSettings: { workspaceKey: "xx" },
        settings: { workspaceId: "xx" },
        typeHandlerVersion: "1.10",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateArcExtension();
}

main().catch(console.error);
