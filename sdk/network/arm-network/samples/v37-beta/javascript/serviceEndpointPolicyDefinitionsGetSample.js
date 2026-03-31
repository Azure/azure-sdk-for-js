// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ServiceEndpointPolicyDefinition
 *
 * @summary get a ServiceEndpointPolicyDefinition
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyDefinitionGet.json
 */
async function getServiceEndpointDefinitionInServiceEndpointPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceEndpointPolicyDefinitions.get(
    "rg1",
    "testPolicy",
    "testDefinition",
  );
  console.log(result);
}

async function main() {
  await getServiceEndpointDefinitionInServiceEndpointPolicy();
}

main().catch(console.error);
