// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Config Template Version Resource with the specified UpdateType
 *
 * @summary create or update a Config Template Version Resource with the specified UpdateType
 * x-ms-original-file: 2026-05-01-preview/ConfigTemplates_CreateVersion_MaximumSet_Gen.json
 */
async function configTemplatesCreateVersionMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplates.createVersion("rgconfigurationmanager", "testname", {
    updateType: "Major",
    version: "1.0.0",
    configTemplateVersion: { properties: { configurations: "zsapegdehodzmwjmwl" } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await configTemplatesCreateVersionMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
