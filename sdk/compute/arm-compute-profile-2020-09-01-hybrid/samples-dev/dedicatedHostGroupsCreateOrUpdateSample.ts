// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update a dedicated host group. For details of Dedicated Host and Dedicated Host Groups please see [Dedicated Host Documentation] (https://go.microsoft.com/fwlink/?linkid=2082596)
 *
 * @summary Create or update a dedicated host group. For details of Dedicated Host and Dedicated Host Groups please see [Dedicated Host Documentation] (https://go.microsoft.com/fwlink/?linkid=2082596)
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/stable/2020-06-01/examples/CreateOrUpdateADedicatedHostGroup.json
 */

import type { DedicatedHostGroup } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { ComputeManagementClient } from "@azure/arm-compute-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateADedicatedHostGroup(): Promise<void> {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const hostGroupName = "myDedicatedHostGroup";
  const parameters: DedicatedHostGroup = {
    location: "westus",
    platformFaultDomainCount: 3,
    supportAutomaticPlacement: true,
    tags: { department: "finance" },
    zones: ["1"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.createOrUpdate(
    resourceGroupName,
    hostGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateADedicatedHostGroup();
}

main().catch(console.error);
