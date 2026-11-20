// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ConfigTemplateMetadata Resource
 *
 * @summary get a ConfigTemplateMetadata Resource
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplateMetadatas_Get_MaximumSet_Gen.json
 */
async function configTemplateMetadatasGetMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplateMetadatas.get(
    "rgconfigurationmanager",
    "abcde",
    "abcde",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configTemplateMetadatasGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
