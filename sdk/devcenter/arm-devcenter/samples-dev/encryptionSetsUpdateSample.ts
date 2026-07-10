// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to partially updates a devcenter encryption set.
 *
 * @summary partially updates a devcenter encryption set.
 * x-ms-original-file: 2026-01-01-preview/DevCenterEncryptionSets_Patch.json
 */
async function encryptionSetsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.encryptionSets.update("rg1", "Contoso", "EncryptionWestUs", {
    devboxDisksEncryptionEnableStatus: "Enabled",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await encryptionSetsUpdate();
}

main().catch(console.error);
