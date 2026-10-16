// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a collection of Diagnostic resources within the resource group.
 *
 * @summary returns a collection of Diagnostic resources within the resource group.
 * x-ms-original-file: 2026-05-01-preview/Diagnostics_ListByResourceGroup_MaximumSet_Gen.json
 */
async function diagnosticsListByResourceGroupMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listByResourceGroup("rgconfigurationmanager")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to returns a collection of Diagnostic resources within the resource group.
 *
 * @summary returns a collection of Diagnostic resources within the resource group.
 * x-ms-original-file: 2026-05-01-preview/Diagnostics_ListByResourceGroup_MinimumSet_Gen.json
 */
async function diagnosticsListByResourceGroupMaximumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.diagnostics.listByResourceGroup("rgconfigurationmanager")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await diagnosticsListByResourceGroupMaximumSetGeneratedByMaximumSetRule();
  await diagnosticsListByResourceGroupMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
