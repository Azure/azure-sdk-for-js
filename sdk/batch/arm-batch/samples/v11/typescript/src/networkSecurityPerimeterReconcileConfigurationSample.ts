// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reconciles the specified NSP configuration.
 *
 * @summary reconciles the specified NSP configuration.
 * x-ms-original-file: 2025-06-01/NspConfigurationReconcile.json
 */
async function reconcileNspConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeter.reconcileConfiguration(
    "default-azurebatch-japaneast",
    "sampleacct",
    "00000000-0000-0000-0000-000000000000.sampleassociation",
  );
}

async function main(): Promise<void> {
  await reconcileNspConfiguration();
}

main().catch(console.error);
