// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Config Template Version Resources
 *
 * @summary list Config Template Version Resources
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplateVersions_ListByConfigTemplate_MaximumSet_Gen.json
 */
async function configTemplateVersionsListByConfigTemplateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configTemplateVersions.listByConfigTemplate(
    "rgconfigurationmanager",
    "testname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await configTemplateVersionsListByConfigTemplateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
