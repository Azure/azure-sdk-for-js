// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a SecurityPolicy
 *
 * @summary delete a SecurityPolicy
 * x-ms-original-file: 2025-03-01-preview/SecurityPolicyDelete.json
 */
async function deleteSecurityPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  await client.securityPoliciesInterface.delete("rg1", "tc1", "sp1");
}

async function main() {
  await deleteSecurityPolicy();
}

main().catch(console.error);
