// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets specific run command for a subscription in a location.
 *
 * @summary gets specific run command for a subscription in a location.
 * x-ms-original-file: 2025-04-01/runCommandExamples/RunCommand_Get.json
 */
async function virtualMachineRunCommandGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "24fb23e3-6ba3-41f0-9b6e-e41131d5d61e";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineRunCommandsOperationGroup.get(
    "SoutheastAsia",
    "RunPowerShellScript",
  );
  console.log(result);
}

async function main() {
  await virtualMachineRunCommandGet();
}

main().catch(console.error);
