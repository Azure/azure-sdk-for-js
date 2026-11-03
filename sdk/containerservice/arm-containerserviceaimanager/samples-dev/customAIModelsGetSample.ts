// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a CustomAIModel
 *
 * @summary get a CustomAIModel
 * x-ms-original-file: 2026-09-02-preview/CustomAIModels_Get.json
 */
async function getACustomAIModel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.customAIModels.get("rg1", "aimanager1", "custom-model1");
  console.log(result);
}

async function main(): Promise<void> {
  await getACustomAIModel();
}

main().catch(console.error);
