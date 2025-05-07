// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StandbyPoolManagementClient } = require("@azure/arm-standbypool");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a StandbyVirtualMachinePoolResource
 *
 * @summary delete a StandbyVirtualMachinePoolResource
 * x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_Delete.json
 */
async function standbyVirtualMachinePoolsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  await client.standbyVirtualMachinePools.delete("rgstandbypool", "pool");
}

async function main() {
  await standbyVirtualMachinePoolsDelete();
}

main().catch(console.error);
