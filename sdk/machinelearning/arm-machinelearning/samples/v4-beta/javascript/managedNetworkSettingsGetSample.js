// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get API for managed network settings of a machine learning workspace.
 *
 * @summary get API for managed network settings of a machine learning workspace.
 * x-ms-original-file: 2026-03-15-preview/ManagedNetwork/getManagedNetworkV2.json
 */
async function getManagedNetworkSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.managedNetworkSettings.get(
    "test-rg",
    "aml-workspace-name",
    "default",
  );
  console.log(result);
}

async function main() {
  await getManagedNetworkSettings();
}

main().catch(console.error);
