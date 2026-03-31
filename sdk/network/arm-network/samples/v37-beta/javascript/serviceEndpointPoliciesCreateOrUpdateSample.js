// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a service Endpoint Policies.
 *
 * @summary creates or updates a service Endpoint Policies.
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyCreate.json
 */
async function createServiceEndpointPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceEndpointPolicies.createOrUpdate("rg1", "testPolicy", {
    location: "westus",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a service Endpoint Policies.
 *
 * @summary creates or updates a service Endpoint Policies.
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyCreateWithDefinition.json
 */
async function createServiceEndpointPolicyWithDefinition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceEndpointPolicies.createOrUpdate("rg1", "testPolicy", {
    location: "westus",
    serviceEndpointPolicyDefinitions: [
      {
        description: "Storage Service EndpointPolicy Definition",
        service: "Microsoft.Storage",
        serviceResources: [
          "/subscriptions/00000000-0000-0000-0000-000000000000",
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/storageRg",
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/storageRg/providers/Microsoft.Storage/storageAccounts/stAccount",
        ],
      },
    ],
  });
  console.log(result);
}

async function main() {
  await createServiceEndpointPolicy();
  await createServiceEndpointPolicyWithDefinition();
}

main().catch(console.error);
