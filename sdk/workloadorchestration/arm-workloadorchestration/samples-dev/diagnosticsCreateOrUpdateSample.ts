// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new or updates existing Diagnostic resource.
 *
 * @summary creates new or updates existing Diagnostic resource.
 * x-ms-original-file: 2025-06-01/Diagnostics_CreateOrUpdate_MaximumSet_Gen.json
 */
async function diagnosticsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.diagnostics.createOrUpdate("rgconfigurationmanager", "testname", {
    properties: {},
    extendedLocation: { name: "szjrwimeqyiue", type: "EdgeZone" },
    tags: { key4304: "mdrwpsdrcicagvximokxrrp" },
    location: "ouwfvnokjvivmjzqpupwrbsmls",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await diagnosticsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
