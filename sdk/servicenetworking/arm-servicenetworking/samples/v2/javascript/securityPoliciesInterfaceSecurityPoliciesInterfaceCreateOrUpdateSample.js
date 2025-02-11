// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a SecurityPolicy
 *
 * @summary create a SecurityPolicy
 * x-ms-original-file: 2025-01-01/SecurityPolicyPut.json
 */
async function putSecurityPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.securityPoliciesInterface.createOrUpdate("rg1", "tc1", "sp1", {
    location: "NorthCentralUS",
    properties: {
      wafPolicy: {
        id: "/subscriptions/subid/resourcegroups/rg1/providers/Microsoft.Networking/applicationGatewayWebApplicationFirewallPolicies/wp-0",
      },
    },
  });
  console.log(result);
}

async function main() {
  await putSecurityPolicy();
}

main().catch(console.error);
