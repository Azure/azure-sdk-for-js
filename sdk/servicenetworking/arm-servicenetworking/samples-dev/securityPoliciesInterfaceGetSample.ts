// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get a SecurityPolicy
 *
 * @summary get a SecurityPolicy
 * x-ms-original-file: 2025-03-01-preview/SecurityPolicyGet.json
 */

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

async function getSecurityPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.securityPoliciesInterface.get("rg1", "tc1", "sp1");
  console.log(result);
}

async function main(): Promise<void> {
  await getSecurityPolicy();
}

main().catch(console.error);
