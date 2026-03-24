// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provisions the managed network of a machine learning workspace.
 *
 * @summary provisions the managed network of a machine learning workspace.
 * x-ms-original-file: 2025-12-01/ManagedNetwork/provision.json
 */
async function provisionManagedNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.managedNetworkProvisions.provisionManagedNetwork(
    "test-rg",
    "aml-workspace-name",
    { body: { includeSpark: false } },
  );
  console.log(result);
}

async function main() {
  await provisionManagedNetwork();
}

main().catch(console.error);
