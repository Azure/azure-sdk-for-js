// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update storage task assignment properties
 *
 * @summary update storage task assignment properties
 * x-ms-original-file: 2025-08-01/storageTaskAssignmentsCrud/PatchStorageTaskAssignment.json
 */
async function patchStorageTaskAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageTaskAssignments.update("res4228", "sto4445", "myassignment1", {
    properties: {
      description: "My Storage task assignment",
      enabled: true,
      executionContext: {
        target: { excludePrefix: [], prefix: ["prefix1", "prefix2"] },
        trigger: {
          type: "RunOnce",
          parameters: { startOn: new Date("2022-11-15T21:52:47.8145095Z") },
        },
      },
      report: { prefix: "container1" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchStorageTaskAssignment();
}

main().catch(console.error);
