// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ServiceEndpointPolicyDefinitionsListByResourceGroupParameters,
  paginate
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets all service endpoint policy definitions in a service end point policy.
 *
 * @summary Gets all service endpoint policy definitions in a service end point policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceEndpointPolicyDefinitionList.json
 */
async function listServiceEndpointDefinitionsInServiceEndPointPolicy() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceEndpointPolicyName = "testPolicy";
  const options: ServiceEndpointPolicyDefinitionsListByResourceGroupParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}/serviceEndpointPolicyDefinitions",
      subscriptionId,
      resourceGroupName,
      serviceEndpointPolicyName
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listServiceEndpointDefinitionsInServiceEndPointPolicy().catch(console.error);
