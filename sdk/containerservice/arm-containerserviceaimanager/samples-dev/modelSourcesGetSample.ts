// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ModelSource
 *
 * @summary get a ModelSource
 * x-ms-original-file: 2026-05-02-preview/ModelSources_Get.json
 */
async function modelSourcesGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.modelSources.get("rgaimanagers", "aimanager1", "huggingface");
  console.log(result);
}

async function main(): Promise<void> {
  await modelSourcesGetMaximumSet();
}

main().catch(console.error);
