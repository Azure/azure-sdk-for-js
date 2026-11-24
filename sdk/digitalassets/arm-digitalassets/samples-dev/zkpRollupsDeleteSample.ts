// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DigitalAssetsClient } from "@azure/arm-digitalassets";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ZkpRollup
 *
 * @summary delete a ZkpRollup
 * x-ms-original-file: 2025-09-01-preview/ZkpRollups_Delete.json
 */
async function deleteZkpRollup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DigitalAssetsClient(credential, subscriptionId);
  await client.zkpRollups.delete("testrg", "Jack");
}

async function main(): Promise<void> {
  await deleteZkpRollup();
}

main().catch(console.error);
