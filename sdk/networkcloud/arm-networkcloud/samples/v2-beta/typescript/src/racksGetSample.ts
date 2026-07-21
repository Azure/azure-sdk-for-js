// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of the provided rack.
 *
 * @summary get properties of the provided rack.
 * x-ms-original-file: 2026-05-01-preview/Racks_Get.json
 */
async function getRack(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.racks.get("resourceGroupName", "rackName");
  console.log(result);
}

async function main(): Promise<void> {
  await getRack();
}

main().catch(console.error);
