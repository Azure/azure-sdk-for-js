// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets specific run command for a subscription in a location.
 *
 * @summary gets specific run command for a subscription in a location.
 * x-ms-original-file: 2025-04-01/runCommandExamples/RunCommand_Get.json
 */
async function virtualMachineRunCommandGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "24fb23e3-6ba3-41f0-9b6e-e41131d5d61e";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineRunCommandsOperationGroup.get(
    "SoutheastAsia",
    "RunPowerShellScript",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineRunCommandGet();
}

main().catch(console.error);
