// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a devcenter encryption set.
 *
 * @summary gets a devcenter encryption set.
 * x-ms-original-file: 2026-01-01-preview/DevCenterEncryptionSets_Get.json
 */
async function encryptionSetsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.encryptionSets.get("rg1", "Contoso", "EncryptionWestUs");
  console.log(result);
}

async function main(): Promise<void> {
  await encryptionSetsGet();
}

main().catch(console.error);
