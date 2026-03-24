// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete capabilityHost.
 *
 * @summary delete capabilityHost.
 * x-ms-original-file: 2025-12-01/CapabilityHost/delete.json
 */
async function deleteCapabilityHost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.capabilityHosts.delete("test-rg", "my-aml-workspace", "capabilityHostName");
}

async function main() {
  await deleteCapabilityHost();
}

main().catch(console.error);
