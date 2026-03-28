// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an outbound rule from the managed network of a machine learning workspace.
 *
 * @summary deletes an outbound rule from the managed network of a machine learning workspace.
 * x-ms-original-file: 2025-12-01/ManagedNetwork/deleteRule.json
 */
async function deleteManagedNetworkSettingsRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.managedNetworkSettingsRule.delete("test-rg", "aml-workspace-name", "rule-name");
}

async function main() {
  await deleteManagedNetworkSettingsRule();
}

main().catch(console.error);
