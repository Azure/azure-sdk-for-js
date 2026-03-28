// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete version.
 *
 * @summary delete version.
 * x-ms-original-file: 2025-12-01/Workspace/FeaturesetVersion/delete.json
 */
async function deleteWorkspaceFeaturesetVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.featuresetVersions.delete("test-rg", "my-aml-workspace", "string", "string");
}

async function main(): Promise<void> {
  await deleteWorkspaceFeaturesetVersion();
}

main().catch(console.error);
