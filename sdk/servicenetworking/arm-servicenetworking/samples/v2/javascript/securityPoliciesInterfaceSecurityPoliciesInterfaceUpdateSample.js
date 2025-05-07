// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a SecurityPolicy
 *
 * @summary update a SecurityPolicy
 * x-ms-original-file: 2025-01-01/SecurityPolicyPatch.json
 */
async function updateSecurityPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.securityPoliciesInterface.update("rg1", "tc1", "sp1", {
    properties: {
      wafPolicy: {
        id: "/subscriptions/subid/resourcegroups/rg1/providers/Microsoft.Networking/applicationGatewayWebApplicationFirewallPolicies/wp-0",
      },
    },
  });
  console.log(result);
}

async function main() {
  await updateSecurityPolicy();
}

main().catch(console.error);
