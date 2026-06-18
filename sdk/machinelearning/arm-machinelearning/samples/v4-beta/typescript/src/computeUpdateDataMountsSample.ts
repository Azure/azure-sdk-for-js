// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Data Mounts of a Machine Learning compute.
 *
 * @summary update Data Mounts of a Machine Learning compute.
 * x-ms-original-file: 2026-03-15-preview/Compute/updateDataMounts.json
 */
async function updateDataMounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.compute.updateDataMounts("testrg123", "workspaces123", "compute123", [
    {
      mountAction: "Mount",
      mountMode: "ReadOnly",
      mountName: "hello",
      mountPath: "/some/random/path/on/host",
      source:
        "azureml://subscriptions/some-sub/resourcegroups/some-rg/workspaces/some-ws/data/some-data-asset-name/versions/some-data-asset-version",
      sourceType: "URI",
    },
  ]);
}

async function main(): Promise<void> {
  await updateDataMounts();
}

main().catch(console.error);
