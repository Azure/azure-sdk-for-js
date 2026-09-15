// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Site Reference Resources
 *
 * @summary list Site Reference Resources
 * x-ms-original-file: 2026-05-01-preview/SiteReferences_ListByContext_MaximumSet_Gen.json
 */
async function siteReferencesListByContextMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.siteReferences.listByContext(
    "rgconfigurationmanager",
    "testname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await siteReferencesListByContextMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
