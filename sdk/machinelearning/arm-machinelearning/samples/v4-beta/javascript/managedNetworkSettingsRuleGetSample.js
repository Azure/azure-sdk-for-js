// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an outbound rule from the managed network of a machine learning workspace.
 *
 * @summary gets an outbound rule from the managed network of a machine learning workspace.
 * x-ms-original-file: 2025-12-01/ManagedNetwork/getRule.json
 */
async function getManagedNetworkSettingsRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.managedNetworkSettingsRule.get(
    "test-rg",
    "aml-workspace-name",
    "name_of_the_fqdn_rule",
  );
  console.log(result);
}

async function main() {
  await getManagedNetworkSettingsRule();
}

main().catch(console.error);
