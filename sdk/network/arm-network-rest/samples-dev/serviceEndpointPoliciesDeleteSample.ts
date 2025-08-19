// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceEndpointPoliciesDeleteParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified service endpoint policy.
 *
 * @summary Deletes the specified service endpoint policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceEndpointPolicyDelete.json
 */
async function deleteServiceEndpointPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceEndpointPolicyName = "serviceEndpointPolicy1";
  const options: ServiceEndpointPoliciesDeleteParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}",
      subscriptionId,
      resourceGroupName,
      serviceEndpointPolicyName,
    )
    .delete(options);
  const result = await getLongRunningPoller(client, initialResponse);
  console.log(result);
}

deleteServiceEndpointPolicy().catch(console.error);
