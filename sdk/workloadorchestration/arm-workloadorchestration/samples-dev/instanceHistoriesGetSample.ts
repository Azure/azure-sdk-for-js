// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get InstanceHistory Resource
 *
 * @summary get InstanceHistory Resource
 * x-ms-original-file: 2026-05-01-preview/InstanceHistories_Get_MaximumSet_Gen.json
 */
async function instanceHistoriesGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.instanceHistories.get(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
    "testname",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await instanceHistoriesGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
