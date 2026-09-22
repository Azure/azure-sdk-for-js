// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a devcenter encryption set.
 *
 * @summary deletes a devcenter encryption set.
 * x-ms-original-file: 2026-01-01-preview/DevCenterEncryptionSets_Delete.json
 */
async function encryptionSetsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.encryptionSets.delete("rg1", "Contoso", "EncryptionWestUs");
}

async function main(): Promise<void> {
  await encryptionSetsDelete();
}

main().catch(console.error);
