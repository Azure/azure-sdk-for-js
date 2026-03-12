// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a dedicated host .
 *
 * @summary Create or update a dedicated host .
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHost_CreateOrUpdate.json
 */

import type { DedicatedHostsCreateOrUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateADedicatedHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const hostGroupName = "myDedicatedHostGroup";
  const hostName = "myDedicatedHost";
  const options: DedicatedHostsCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: { platformFaultDomain: 1 },
      sku: { name: "DSv3-Type1" },
      tags: { department: "HR" },
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
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateADedicatedHost().catch(console.error);
