// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftStorageSync } = require("@azure/arm-storagesync");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Workflows resource
 *
 * @summary get Workflows resource
 * x-ms-original-file: 2022-09-01/Workflows_Get.json
 */
async function workflowsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const result = await client.workflows.get(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
    "828219ea-083e-48b5-89ea-8fd9991b2e75",
  );
  console.log(result);
}

async function main() {
  await workflowsGet();
}

main().catch(console.error);
