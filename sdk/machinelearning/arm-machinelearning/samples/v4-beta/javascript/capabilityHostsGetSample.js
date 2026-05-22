// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get capabilityHost.
 *
 * @summary get capabilityHost.
 * x-ms-original-file: 2025-12-01/CapabilityHost/get.json
 */
async function getCapabilityHost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.capabilityHosts.get(
    "test-rg",
    "my-aml-workspace",
    "capabilityHostName",
  );
  console.log(result);
}

async function main() {
  await getCapabilityHost();
}

main().catch(console.error);
