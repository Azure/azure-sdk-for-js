// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Instance Resource
 *
 * @summary create or update Instance Resource
 * x-ms-original-file: 2026-05-01-preview/Instances_CreateOrUpdate_MaximumSet_Gen.json
 */
async function instancesCreateOrUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "612CB927-8AC8-42DD-B74E-C676C3960BA5";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.instances.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
    {
      properties: {
        solutionVersionId: "nrufwrrlslbu",
        targetId: "cxhzexpvtx",
        activeState: "active",
        reconciliationPolicy: { state: "inactive", interval: "sefmajhesdas" },
        solutionScope: "testname",
      },
      extendedLocation: { name: "ggfwkwklvvkrmlysvvhcj", type: "EdgeZone" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await instancesCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
