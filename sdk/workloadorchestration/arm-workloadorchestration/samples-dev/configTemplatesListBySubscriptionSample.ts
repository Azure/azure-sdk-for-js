// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list by subscription
 *
 * @summary list by subscription
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplates_ListBySubscription_MaximumSet_Gen.json
 */
async function configTemplatesListBySubscriptionMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configTemplates.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list by subscription
 *
 * @summary list by subscription
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplates_ListBySubscription_MinimumSet_Gen.json
 */
async function configTemplatesListBySubscriptionMaximumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configTemplates.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await configTemplatesListBySubscriptionMaximumSetGeneratedByMaximumSetRule();
  await configTemplatesListBySubscriptionMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
