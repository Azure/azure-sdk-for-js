// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete version.
 *
 * @summary delete version.
 * x-ms-original-file: 2025-12-01/Workspace/FeaturestoreEntityVersion/delete.json
 */
async function deleteWorkspaceFeaturestoreEntityVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.featurestoreEntityVersions.delete("test-rg", "my-aml-workspace", "string", "string");
}

async function main(): Promise<void> {
  await deleteWorkspaceFeaturestoreEntityVersion();
}

main().catch(console.error);
