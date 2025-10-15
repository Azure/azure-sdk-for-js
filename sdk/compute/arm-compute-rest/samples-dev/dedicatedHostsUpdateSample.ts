// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update an dedicated host .
 *
 * @summary Update an dedicated host .
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHosts_Update_MaximumSet_Gen.json
 */

import type { DedicatedHostsUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dedicatedHostsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const hostGroupName = "aaaaaaaaa";
  const hostName = "aaaaaaaaaaaaaaaaaaaaa";
  const options: DedicatedHostsUpdateParameters = {
    body: {
      properties: {
        autoReplaceOnFailure: true,
        licenseType: "Windows_Server_Hybrid",
        platformFaultDomain: 1,
      },
      tags: { key8813: "aaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}",
      subscriptionId,
      resourceGroupName,
      hostGroupName,
      hostName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

dedicatedHostsUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Update an dedicated host .
 *
 * @summary Update an dedicated host .
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHosts_Update_MinimumSet_Gen.json
 */
async function dedicatedHostsUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const hostGroupName = "aa";
  const hostName = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: DedicatedHostsUpdateParameters = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}",
      subscriptionId,
      resourceGroupName,
      hostGroupName,
      hostName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

dedicatedHostsUpdateMinimumSetGen().catch(console.error);
