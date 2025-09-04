// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Config Template Version Resource with the specified UpdateType
 *
 * @summary create or update a Config Template Version Resource with the specified UpdateType
 * x-ms-original-file: 2025-06-01/ConfigTemplates_CreateVersion_MaximumSet_Gen.json
 */
async function configTemplatesCreateVersionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.configTemplates.createVersion("rgconfigurationmanager", "testname", {
    updateType: "Major",
    version: "1.0.0",
    configTemplateVersion: {
      properties: { configurations: "rgricnhvcbqykc" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await configTemplatesCreateVersionMaximumSet();
}

main().catch(console.error);
