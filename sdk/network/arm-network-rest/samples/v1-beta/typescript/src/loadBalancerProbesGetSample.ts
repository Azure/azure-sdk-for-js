// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  LoadBalancerProbesGetParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets load balancer probe.
 *
 * @summary Gets load balancer probe.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/LoadBalancerProbeGet.json
 */
async function loadBalancerProbeGet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "testrg";
  const loadBalancerName = "lb";
  const probeName = "probe1";
  const options: LoadBalancerProbesGetParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}",
      subscriptionId,
      resourceGroupName,
      loadBalancerName,
      probeName
    )
    .get(options);
  console.log(result);
}

loadBalancerProbeGet().catch(console.error);
