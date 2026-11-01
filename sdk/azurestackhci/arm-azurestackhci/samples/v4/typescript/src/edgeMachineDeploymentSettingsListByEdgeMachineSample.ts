// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Edge Machine Deployment Setting resources by Edge Machine.
 *
 * @summary list Edge Machine Deployment Setting resources by Edge Machine.
 * x-ms-original-file: 2026-10-01/EdgeMachineDeploymentSettings_ListByEdgeMachine.json
 */
async function edgeMachineDeploymentSettingsListByEdgeMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeMachineDeploymentSettings.listByEdgeMachine(
    "test-rg",
    "EdgeMachine01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await edgeMachineDeploymentSettingsListByEdgeMachine();
}

main().catch(console.error);
