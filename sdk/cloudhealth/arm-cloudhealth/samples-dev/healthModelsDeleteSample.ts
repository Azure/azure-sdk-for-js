// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a HealthModel
 *
 * @summary delete a HealthModel
 * x-ms-original-file: 2026-05-01-preview/HealthModels_Delete.json
 */
async function healthModelsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.healthModels.delete("online-store-rg", "online-store");
}

async function main(): Promise<void> {
  await healthModelsDelete();
}

main().catch(console.error);
