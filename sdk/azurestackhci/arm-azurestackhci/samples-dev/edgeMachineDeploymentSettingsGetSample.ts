// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an Edge Machine Deployment Setting.
 *
 * @summary get an Edge Machine Deployment Setting.
 * x-ms-original-file: 2026-10-01/EdgeMachineDeploymentSettings_Get.json
 */
async function edgeMachineDeploymentSettingsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineDeploymentSettings.get(
    "test-rg",
    "EdgeMachine01",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineDeploymentSettingsGet();
}

main().catch(console.error);
