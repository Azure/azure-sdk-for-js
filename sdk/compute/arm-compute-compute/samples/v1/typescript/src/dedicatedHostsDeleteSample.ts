// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a dedicated host.
 *
 * @summary delete a dedicated host.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Delete_MaximumSet_Gen.json
 */
async function dedicatedHostDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.dedicatedHosts.delete("rgcompute", "aaaaaa", "aaaaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to delete a dedicated host.
 *
 * @summary delete a dedicated host.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Delete_MinimumSet_Gen.json
 */
async function dedicatedHostDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.dedicatedHosts.delete("rgcompute", "aaaaaaaaaaaaaaa", "aaaaa");
}

async function main(): Promise<void> {
  await dedicatedHostDeleteMaximumSetGen();
  await dedicatedHostDeleteMinimumSetGen();
}

main().catch(console.error);
