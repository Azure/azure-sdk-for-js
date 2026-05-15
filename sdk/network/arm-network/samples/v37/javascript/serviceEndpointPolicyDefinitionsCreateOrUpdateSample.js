// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a service endpoint policy definition in the specified service endpoint policy.
 *
 * @summary creates or updates a service endpoint policy definition in the specified service endpoint policy.
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyDefinitionCreate.json
 */
async function createServiceEndpointPolicyDefinition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceEndpointPolicyDefinitions.createOrUpdate(
    "rg1",
    "testPolicy",
    "testDefinition",
    {
      description: "Storage Service EndpointPolicy Definition",
      service: "Microsoft.Storage",
      serviceResources: [
        "/subscriptions/00000000-0000-0000-0000-000000000000",
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/storageRg",
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/storageRg/providers/Microsoft.Storage/storageAccounts/stAccount",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await createServiceEndpointPolicyDefinition();
}

main().catch(console.error);
