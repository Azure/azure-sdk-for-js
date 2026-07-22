// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of the provided layer 2 (L2) network.
 *
 * @summary get properties of the provided layer 2 (L2) network.
 * x-ms-original-file: 2026-05-01-preview/L2Networks_Get.json
 */
async function getL2Network(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.l2Networks.get("resourceGroupName", "l2NetworkName");
  console.log(result);
}

async function main(): Promise<void> {
  await getL2Network();
}

main().catch(console.error);
