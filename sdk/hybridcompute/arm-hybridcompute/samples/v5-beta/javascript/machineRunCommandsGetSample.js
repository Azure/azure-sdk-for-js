// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get a run command.
 *
 * @summary the operation to get a run command.
 * x-ms-original-file: 2026-06-16-preview/runCommand/RunCommands_Get.json
 */
async function getARunCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machineRunCommands.get(
    "myResourceGroup",
    "myMachine",
    "myRunCommand",
  );
  console.log(result);
}

async function main() {
  await getARunCommand();
}

main().catch(console.error);
