// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the singleton change data capture capability for a HorizonDB cluster.
 *
 * @summary gets the singleton change data capture capability for a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/ChangeDataCaptureCapabilities_Get.json
 */
async function getTheClusterChangeDataCaptureCapability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.changeDataCaptureCapabilities.get(
    "example-resource-group",
    "example-cluster",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheClusterChangeDataCaptureCapability();
}

main().catch(console.error);
