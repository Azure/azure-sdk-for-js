// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces the singleton change data capture capability and reconciles shared engine prerequisites.
 *
 * @summary creates or replaces the singleton change data capture capability and reconciles shared engine prerequisites.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureCapabilities_CreateOrReplace.json
 */
async function enableTheClusterChangeDataCaptureCapability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureCapabilities.createOrReplace(
    "example-resource-group",
    "example-cluster",
    { properties: { desiredState: "Enabled", autoUpgradeExtension: true } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await enableTheClusterChangeDataCaptureCapability();
}

main().catch(console.error);
