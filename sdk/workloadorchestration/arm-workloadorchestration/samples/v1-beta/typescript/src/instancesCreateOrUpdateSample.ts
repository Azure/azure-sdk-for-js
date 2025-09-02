// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementClient } from "@azure/arm-workloadorchestration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update Instance Resource
 *
 * @summary create or update Instance Resource
 * x-ms-original-file: 2025-06-01/Instances_CreateOrUpdate_MaximumSet_Gen.json
 */
async function instancesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9D54FE4C-00AF-4836-8F48-B6A9C4E47192";
  const client = new WorkloadOrchestrationManagementClient(credential, subscriptionId);
  const result = await client.instances.createOrUpdate(
    "rgconfigurationmanager",
    "testname",
    "testname",
    "testname",
    {
      properties: {
        solutionVersionId: "acpddbkfclsgxg",
        targetId: "eguutiftuxrsavvckjrv",
        activeState: "active",
        reconciliationPolicy: {
          state: "inactive",
          interval: "szucgzdbydcowvhprhx",
        },
        solutionScope: "testname",
        status: {
          lastModified: new Date("2025-06-09T10:12:04.224Z"),
          deployed: 24,
          expectedRunningJobId: 19,
          runningJobId: 6,
          status: "nnpksn",
          statusDetails: "bslqqnfciczenaltdcmrgg",
          generation: 21,
          targetStatuses: [
            {
              name: "jpbfbxmjvr",
              status: "gsgkxfwtyoaepwa",
              componentStatuses: [
                {
                  name: "lxzbkoblvaoubknkblwplf",
                  status: "txtthlvducufbblgtctegtgpzkzgyi",
                },
              ],
            },
          ],
        },
      },
      extendedLocation: { name: "szjrwimeqyiue", type: "EdgeZone" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await instancesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
