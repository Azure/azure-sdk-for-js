// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a HealthModel
 *
 * @summary get a HealthModel
 * x-ms-original-file: 2025-05-01-preview/HealthModels_Get.json
 */

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

async function healthModelsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.healthModels.get("rgopenapi", "myHealthModel");
  console.log(result);
}

async function main(): Promise<void> {
  await healthModelsGet();
}

main().catch(console.error);
