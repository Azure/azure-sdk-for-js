// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a HealthModel
 *
 * @summary update a HealthModel
 * x-ms-original-file: 2026-05-01-preview/HealthModels_Update.json
 */
async function healthModelsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.healthModels.update("online-store-rg", "online-store", {
    tags: { environment: "production", team: "online-store", tier: "gold" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await healthModelsUpdate();
}

main().catch(console.error);
