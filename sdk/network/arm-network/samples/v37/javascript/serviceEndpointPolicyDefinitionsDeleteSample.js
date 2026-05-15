// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified ServiceEndpoint policy definitions.
 *
 * @summary deletes the specified ServiceEndpoint policy definitions.
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyDefinitionDelete.json
 */
async function deleteServiceEndpointPolicyDefinitionsFromServiceEndpointPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.serviceEndpointPolicyDefinitions.delete("rg1", "testPolicy", "testDefinition");
}

async function main() {
  await deleteServiceEndpointPolicyDefinitionsFromServiceEndpointPolicy();
}

main().catch(console.error);
