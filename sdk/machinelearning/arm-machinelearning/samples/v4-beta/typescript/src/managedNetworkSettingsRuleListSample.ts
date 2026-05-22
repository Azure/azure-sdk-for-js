// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the managed network outbound rules for a machine learning workspace.
 *
 * @summary lists the managed network outbound rules for a machine learning workspace.
 * x-ms-original-file: 2025-12-01/ManagedNetwork/listRule.json
 */
async function listManagedNetworkSettingsRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedNetworkSettingsRule.list(
    "test-rg",
    "aml-workspace-name",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedNetworkSettingsRule();
}

main().catch(console.error);
