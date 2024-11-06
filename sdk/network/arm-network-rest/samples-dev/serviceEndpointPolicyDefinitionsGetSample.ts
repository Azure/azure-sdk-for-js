// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ServiceEndpointPolicyDefinitionsGetParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get the specified service endpoint policy definitions from service endpoint policy.
 *
 * @summary Get the specified service endpoint policy definitions from service endpoint policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceEndpointPolicyDefinitionGet.json
 */
async function getServiceEndpointDefinitionInServiceEndpointPolicy() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceEndpointPolicyName = "testPolicy";
  const serviceEndpointPolicyDefinitionName = "testDefinition";
  const options: ServiceEndpointPolicyDefinitionsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}/serviceEndpointPolicyDefinitions/{serviceEndpointPolicyDefinitionName}",
      subscriptionId,
      resourceGroupName,
      serviceEndpointPolicyName,
      serviceEndpointPolicyDefinitionName,
    )
    .get(options);
  console.log(result);
}

getServiceEndpointDefinitionInServiceEndpointPolicy().catch(console.error);
