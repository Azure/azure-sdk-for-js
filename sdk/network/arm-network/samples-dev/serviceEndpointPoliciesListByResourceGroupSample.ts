// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all service endpoint Policies in a resource group.
 *
 * @summary gets all service endpoint Policies in a resource group.
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyList.json
 */
async function listResourceGroupServiceEndpointPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.serviceEndpointPolicies.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listResourceGroupServiceEndpointPolicies();
}

main().catch(console.error);
