// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  UpdateSAPVirtualInstanceRequest,
  SAPVirtualInstancesUpdateOptionalParams,
} from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a Virtual Instance for SAP solutions resource
 *
 * @summary Updates a Virtual Instance for SAP solutions resource
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/sapvirtualinstances/SAPVirtualInstances_Update.json
 */
async function sapVirtualInstancesUpdate(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "test-rg";
  const sapVirtualInstanceName = "X00";
  const body: UpdateSAPVirtualInstanceRequest = {
    identity: { type: "None" },
    tags: { key1: "svi1" },
  };
  const options: SAPVirtualInstancesUpdateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sAPVirtualInstances.update(
    resourceGroupName,
    sapVirtualInstanceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sapVirtualInstancesUpdate();
}

main().catch(console.error);
