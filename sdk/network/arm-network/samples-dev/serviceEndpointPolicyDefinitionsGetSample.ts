// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the specified service endpoint policy definitions from service endpoint policy.
 *
 * @summary Get the specified service endpoint policy definitions from service endpoint policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/ServiceEndpointPolicyDefinitionGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getServiceEndpointDefinitionInServiceEndpointPolicy(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceEndpointPolicyName = "testPolicy";
  const serviceEndpointPolicyDefinitionName = "testDefinition";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceEndpointPolicyDefinitions.get(
    resourceGroupName,
    serviceEndpointPolicyName,
    serviceEndpointPolicyDefinitionName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getServiceEndpointDefinitionInServiceEndpointPolicy();
}

main().catch(console.error);
