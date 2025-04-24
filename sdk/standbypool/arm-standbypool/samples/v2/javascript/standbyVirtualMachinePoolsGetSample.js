// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StandbyPoolManagementClient } = require("@azure/arm-standbypool");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a StandbyVirtualMachinePoolResource
 *
 * @summary get a StandbyVirtualMachinePoolResource
 * x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_Get.json
 */
async function standbyVirtualMachinePoolsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const result = await client.standbyVirtualMachinePools.get("rgstandbypool", "pool");
  console.log(result);
}

async function main() {
  await standbyVirtualMachinePoolsGet();
}

main().catch(console.error);
