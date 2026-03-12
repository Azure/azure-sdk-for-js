// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StandbyPoolManagementClient } = require("@azure/arm-standbypool");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a StandbyVirtualMachinePoolRuntimeViewResource
 *
 * @summary get a StandbyVirtualMachinePoolRuntimeViewResource
 * x-ms-original-file: 2025-03-01/StandbyVirtualMachinePoolRuntimeViews_Get.json
 */
async function standbyVirtualMachinePoolRuntimeViewsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const result = await client.standbyVirtualMachinePoolRuntimeViews.get(
    "rgstandbypool",
    "pool",
    "latest",
  );
  console.log(result);
}

async function main() {
  await standbyVirtualMachinePoolRuntimeViewsGet();
}

main().catch(console.error);
