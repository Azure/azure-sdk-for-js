// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update capabilityHost.
 *
 * @summary create or update capabilityHost.
 * x-ms-original-file: 2025-12-01/CapabilityHost/createOrUpdate.json
 */
async function createOrUpdateCapabilityHost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.capabilityHosts.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "capabilityHostName",
    {
      properties: {
        acaEnvironmentConnections: ["sampleAcaEnvironmentConnection"],
        aiServicesConnections: ["sampleAIServiceConnection"],
        customerSubnet:
          "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/myResourceGroups/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
        storageConnections: ["sampleStorageConnection"],
        threadStorageConnections: ["sampleThreadStorageConnection"],
        vectorStoreConnections: ["sampleVectorStoreConnection"],
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateCapabilityHost();
}

main().catch(console.error);
