// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  PrivateEndpointsGetParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified private endpoint by resource group.
 *
 * @summary Gets the specified private endpoint by resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateEndpointGet.json
 */
async function getPrivateEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const privateEndpointName = "testPe";
  const options: PrivateEndpointsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}",
      subscriptionId,
      resourceGroupName,
      privateEndpointName,
    )
    .get(options);
  console.log(result);
}

getPrivateEndpoint().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified private endpoint by resource group.
 *
 * @summary Gets the specified private endpoint by resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateEndpointGetWithASG.json
 */
async function getPrivateEndpointWithApplicationSecurityGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const privateEndpointName = "testPe";
  const options: PrivateEndpointsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}",
      subscriptionId,
      resourceGroupName,
      privateEndpointName,
    )
    .get(options);
  console.log(result);
}

getPrivateEndpointWithApplicationSecurityGroups().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified private endpoint by resource group.
 *
 * @summary Gets the specified private endpoint by resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateEndpointGetForManualApproval.json
 */
async function getPrivateEndpointWithManualApprovalConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const privateEndpointName = "testPe";
  const options: PrivateEndpointsGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}",
      subscriptionId,
      resourceGroupName,
      privateEndpointName,
    )
    .get(options);
  console.log(result);
}

getPrivateEndpointWithManualApprovalConnection().catch(console.error);
