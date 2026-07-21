// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of the provided access bridge.
 *
 * @summary get the properties of the provided access bridge.
 * x-ms-original-file: 2026-05-01-preview/AccessBridges_Get.json
 */
async function getAccessBridge(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.accessBridges.get("resourceGroupName", "Bastion");
  console.log(result);
}

async function main(): Promise<void> {
  await getAccessBridge();
}

main().catch(console.error);
