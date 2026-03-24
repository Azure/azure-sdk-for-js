// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an outbound rule in the managed network of a machine learning workspace.
 *
 * @summary creates or updates an outbound rule in the managed network of a machine learning workspace.
 * x-ms-original-file: 2025-12-01/ManagedNetwork/createOrUpdateRule.json
 */
async function createOrUpdateManagedNetworkSettingsRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.managedNetworkSettingsRule.createOrUpdate(
    "test-rg",
    "aml-workspace-name",
    "rule_name_1",
    {
      properties: {
        type: "FQDN",
        category: "UserDefined",
        destination: "destination_endpoint",
        status: "Active",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateManagedNetworkSettingsRule();
}

main().catch(console.error);
