// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a SecurityPolicy
 *
 * @summary create a SecurityPolicy
 * x-ms-original-file: 2025-03-01-preview/IpAccessRulesSecurityPolicyPut.json
 */
async function putIpAccessRulesSecurityPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.securityPoliciesInterface.createOrUpdate("rg1", "tc1", "sp1", {
    location: "NorthCentralUS",
    properties: { ipAccessRulesPolicy: { rules: [] } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a SecurityPolicy
 *
 * @summary create a SecurityPolicy
 * x-ms-original-file: 2025-03-01-preview/WafSecurityPolicyPut.json
 */
async function putWAFSecurityPolicy(): Promise<void> {
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

async function main(): Promise<void> {
  await putIpAccessRulesSecurityPolicy();
  await putWAFSecurityPolicy();
}

main().catch(console.error);
