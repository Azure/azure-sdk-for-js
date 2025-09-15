// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves information about a dedicated host.
 *
 * @summary Retrieves information about a dedicated host.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/dedicatedHostExamples/DedicatedHost_Get.json
 */

import {
  DedicatedHostsGetOptionalParams,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getADedicatedHost(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const hostGroupName = "myDedicatedHostGroup";
  const hostName = "myHost";
  const expand = "instanceView";
  const options: DedicatedHostsGetOptionalParams = { expand };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.get(
    resourceGroupName,
    hostGroupName,
    hostName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADedicatedHost();
}

main().catch(console.error);
