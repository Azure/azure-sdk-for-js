// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an Instance Resource
 *
 * @summary update an Instance Resource
 * x-ms-original-file: 2025-06-01/Instances_Update_MaximumSet_Gen.json
 */
async function instancesUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.instances.update(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
    {
      properties: {
        solutionVersionId: "vrpzlamkvanqibtjarpxit",
        targetId: "tqkdvc",
        activeState: "active",
        reconciliationPolicy: {
          state: "inactive",
          interval: "cmzlrjwnlshnkgv",
        },
        solutionScope: "testname",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await instancesUpdateMaximumSet();
}

main().catch(console.error);
