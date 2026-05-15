// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified service Endpoint Policies in a specified resource group.
 *
 * @summary gets the specified service Endpoint Policies in a specified resource group.
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyGet.json
 */
async function getServiceEndPointPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceEndpointPolicies.get("rg1", "testServiceEndpointPolicy");
  console.log(result);
}

async function main(): Promise<void> {
  await getServiceEndPointPolicy();
}

main().catch(console.error);
