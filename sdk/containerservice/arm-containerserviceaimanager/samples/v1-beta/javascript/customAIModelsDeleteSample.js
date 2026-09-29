// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a CustomAIModel
 *
 * @summary delete a CustomAIModel
 * x-ms-original-file: 2026-09-02-preview/CustomAIModels_Delete.json
 */
async function deleteACustomAIModel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.customAIModels.delete("rg1", "aimanager1", "custom-model1");
}

async function main() {
  await deleteACustomAIModel();
}

main().catch(console.error);
