// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a service Endpoint Policies.
 *
 * @summary Creates or updates a service Endpoint Policies.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceEndpointPolicyCreate.json
 */

import type { ServiceEndpointPoliciesCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createServiceEndpointPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceEndpointPolicyName = "testPolicy";
  const options: ServiceEndpointPoliciesCreateOrUpdateParameters = {
    body: { location: "westus" },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}",
      subscriptionId,
      resourceGroupName,
      serviceEndpointPolicyName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createServiceEndpointPolicy().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a service Endpoint Policies.
 *
 * @summary Creates or updates a service Endpoint Policies.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceEndpointPolicyCreateWithDefinition.json
 */
async function createServiceEndpointPolicyWithDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceEndpointPolicyName = "testPolicy";
  const options: ServiceEndpointPoliciesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        serviceEndpointPolicyDefinitions: [
          {
            name: "StorageServiceEndpointPolicyDefinition",
            properties: {
              description: "Storage Service EndpointPolicy Definition",
              service: "Microsoft.Storage",
              serviceResources: [
                "/subscriptions/subid1",
                "/subscriptions/subid1/resourceGroups/storageRg",
                "/subscriptions/subid1/resourceGroups/storageRg/providers/Microsoft.Storage/storageAccounts/stAccount",
              ],
            },
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}",
      subscriptionId,
      resourceGroupName,
      serviceEndpointPolicyName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createServiceEndpointPolicyWithDefinition().catch(console.error);
