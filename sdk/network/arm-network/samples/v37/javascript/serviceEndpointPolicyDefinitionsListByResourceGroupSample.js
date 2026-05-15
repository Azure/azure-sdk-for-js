// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all service endpoint policy definitions in a service end point policy.
 *
 * @summary gets all service endpoint policy definitions in a service end point policy.
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyDefinitionList.json
 */
async function listServiceEndpointDefinitionsInServiceEndPointPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serviceEndpointPolicyDefinitions.listByResourceGroup(
    "rg1",
    "testPolicy",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listServiceEndpointDefinitionsInServiceEndPointPolicy();
}

main().catch(console.error);
