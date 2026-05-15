// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all service endpoint policy definitions in a service end point policy.
 *
 * @summary gets all service endpoint policy definitions in a service end point policy.
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyDefinitionList.json
 */
async function listServiceEndpointDefinitionsInServiceEndPointPolicy(): Promise<void> {
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

async function main(): Promise<void> {
  await listServiceEndpointDefinitionsInServiceEndPointPolicy();
}

main().catch(console.error);
