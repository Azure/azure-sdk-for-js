// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a HealthModel
 *
 * @summary delete a HealthModel
 * x-ms-original-file: 2025-05-01-preview/HealthModels_Delete.json
 */

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

async function healthModelsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.healthModels.delete("rgopenapi", "model1");
}

async function main(): Promise<void> {
  await healthModelsDelete();
}

main().catch(console.error);
