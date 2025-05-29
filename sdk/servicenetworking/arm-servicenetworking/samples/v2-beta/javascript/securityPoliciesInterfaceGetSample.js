// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a SecurityPolicy
 *
 * @summary get a SecurityPolicy
 * x-ms-original-file: 2025-03-01-preview/SecurityPolicyGet.json
 */
async function getSecurityPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.securityPoliciesInterface.get("rg1", "tc1", "sp1");
  console.log(result);
}

async function main() {
  await getSecurityPolicy();
}

main().catch(console.error);
