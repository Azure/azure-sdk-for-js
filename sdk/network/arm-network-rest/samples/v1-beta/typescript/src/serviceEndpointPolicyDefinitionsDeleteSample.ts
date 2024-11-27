// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  ServiceEndpointPolicyDefinitionsDeleteParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Deletes the specified ServiceEndpoint policy definitions.
 *
 * @summary Deletes the specified ServiceEndpoint policy definitions.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceEndpointPolicyDefinitionDelete.json
 */
async function deleteServiceEndpointPolicyDefinitionsFromServiceEndpointPolicy() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const serviceEndpointPolicyName = "testPolicy";
  const serviceEndpointPolicyDefinitionName = "testDefinition";
  const options: ServiceEndpointPolicyDefinitionsDeleteParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/{serviceEndpointPolicyName}/serviceEndpointPolicyDefinitions/{serviceEndpointPolicyDefinitionName}",
      subscriptionId,
      resourceGroupName,
      serviceEndpointPolicyName,
      serviceEndpointPolicyDefinitionName
    )
    .delete(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

deleteServiceEndpointPolicyDefinitionsFromServiceEndpointPolicy().catch(
  console.error
);
