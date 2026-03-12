// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Config Template Version Resource
 *
 * @summary get a Config Template Version Resource
 * x-ms-original-file: 2025-06-01/ConfigTemplateVersions_Get_MaximumSet_Gen.json
 */
async function configTemplateVersionsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplateVersions.get(
    "rgconfigurationmanager",
    "testname",
    "1.0.0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configTemplateVersionsGetMaximumSet();
}

main().catch(console.error);
