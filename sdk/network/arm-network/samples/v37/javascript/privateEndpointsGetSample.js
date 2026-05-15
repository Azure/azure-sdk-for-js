// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private endpoint by resource group.
 *
 * @summary gets the specified private endpoint by resource group.
 * x-ms-original-file: 2025-05-01/PrivateEndpointGet.json
 */
async function getPrivateEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateEndpoints.get("rg1", "testPe");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified private endpoint by resource group.
 *
 * @summary gets the specified private endpoint by resource group.
 * x-ms-original-file: 2025-05-01/PrivateEndpointGetForManualApproval.json
 */
async function getPrivateEndpointWithManualApprovalConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateEndpoints.get("rg1", "testPe");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified private endpoint by resource group.
 *
 * @summary gets the specified private endpoint by resource group.
 * x-ms-original-file: 2025-05-01/PrivateEndpointGetWithASG.json
 */
async function getPrivateEndpointWithApplicationSecurityGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateEndpoints.get("rg1", "testPe");
  console.log(result);
}

async function main() {
  await getPrivateEndpoint();
  await getPrivateEndpointWithManualApprovalConnection();
  await getPrivateEndpointWithApplicationSecurityGroups();
}

main().catch(console.error);
