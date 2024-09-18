// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, { LoadBalancersGetParameters } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the specified load balancer.
 *
 * @summary Gets the specified load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerGet.json
 */
async function getLoadBalancer() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .get(options);
  console.log(result);
}

getLoadBalancer().catch(console.error);
/**
 * This sample demonstrates how to Gets the specified load balancer.
 *
 * @summary Gets the specified load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerGetInboundNatRulePortMapping.json
 */
async function getLoadBalancerWithInboundNatRulePortMapping() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const loadBalancerName = "lb";
  const options: LoadBalancersGetParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
    )
    .get(options);
  console.log(result);
}

getLoadBalancerWithInboundNatRulePortMapping().catch(console.error);
