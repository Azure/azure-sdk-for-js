// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Context Resource
 *
 * @summary get Context Resource
 * x-ms-original-file: 2026-05-01-preview/Contexts_Get_MaximumSet_Gen.json
 */
async function contextsGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.contexts.get("rgconfigurationmanager", "testname");
  console.log(result);
}

async function main(): Promise<void> {
  await contextsGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
