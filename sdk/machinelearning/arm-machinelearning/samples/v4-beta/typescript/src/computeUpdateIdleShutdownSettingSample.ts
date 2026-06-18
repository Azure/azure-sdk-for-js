// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the idle shutdown setting of a compute instance.
 *
 * @summary updates the idle shutdown setting of a compute instance.
 * x-ms-original-file: 2026-03-15-preview/Compute/updateIdleShutdownSetting.json
 */
async function updateIdleShutdownSettingOfComputeInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.compute.updateIdleShutdownSetting("testrg123", "workspaces123", "compute123", {
    idleTimeBeforeShutdown: "PT120M",
  });
}

async function main(): Promise<void> {
  await updateIdleShutdownSettingOfComputeInstance();
}

main().catch(console.error);
