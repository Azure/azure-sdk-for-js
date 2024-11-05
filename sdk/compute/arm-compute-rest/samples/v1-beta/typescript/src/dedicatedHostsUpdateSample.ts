// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  DedicatedHostsUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Update an dedicated host .
 *
 * @summary Update an dedicated host .
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHosts_Update_MaximumSet_Gen.json
 */
async function dedicatedHostsUpdateMaximumSetGen() {
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
        instanceView: {
          availableCapacity: {
            allocatableVMs: [{ count: 26, vmSize: "aaaaaaaaaaaaaaaaaaaa" }]
          },
          statuses: [
            {
              code: "aaaaaaaaaaaaaaaaaaaaaaa",
              displayStatus: "aaaaaa",
              level: "Info",
              message: "a",
              time: new Date("2021-11-30T12:58:26.522Z")
            }
          ]
        },
        licenseType: "Windows_Server_Hybrid",
        platformFaultDomain: 1
      },
      tags: { key8813: "aaaaaaaaaaaaaaaaaaaaaaaaaaa" }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}",
      subscriptionId,
      resourceGroupName,
      hostGroupName,
      hostName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
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
async function dedicatedHostsUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const hostGroupName = "aa";
  const hostName = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: DedicatedHostsUpdateParameters = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}/hosts/{hostName}",
      subscriptionId,
      resourceGroupName,
      hostGroupName,
      hostName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

dedicatedHostsUpdateMinimumSetGen().catch(console.error);
