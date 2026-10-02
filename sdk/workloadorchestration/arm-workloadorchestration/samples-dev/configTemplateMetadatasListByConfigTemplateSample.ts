// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list by ConfigTemplate
 *
 * @summary list by ConfigTemplate
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplateMetadatas_ListByConfigTemplate_MaximumSet_Gen.json
 */
async function configTemplateMetadatasListByConfigTemplateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configTemplateMetadatas.listByConfigTemplate(
    "rgconfigurationmanager",
    "abcde",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await configTemplateMetadatasListByConfigTemplateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
