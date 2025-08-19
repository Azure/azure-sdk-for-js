// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 *
 * @summary Deletes a provider instance for the specified subscription, resource group, SAP monitor name, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/ProviderInstances_Delete.json
 */

import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deletesASapMonitorProvider(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const providerInstanceName = "myProviderInstance";
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.providerInstances.beginDeleteAndWait(
    resourceGroupName,
    monitorName,
    providerInstanceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deletesASapMonitorProvider();
}

main().catch(console.error);
