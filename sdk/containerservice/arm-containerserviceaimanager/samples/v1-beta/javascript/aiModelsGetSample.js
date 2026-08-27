// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AIModel
 *
 * @summary get a AIModel
 * x-ms-original-file: 2026-05-02-preview/AIModels_Get.json
 */
async function aiModelsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.aiModels.get("eastus", "9806f0c862fdd920");
  console.log(result);
}

async function main() {
  await aiModelsGetMaximumSet();
}

main().catch(console.error);
