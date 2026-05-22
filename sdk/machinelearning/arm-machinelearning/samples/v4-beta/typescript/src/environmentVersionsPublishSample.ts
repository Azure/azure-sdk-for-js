// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to publish version asset into registry.
 *
 * @summary publish version asset into registry.
 * x-ms-original-file: 2025-12-01/Workspace/EnvironmentVersion/publish.json
 */
async function publishWorkspaceEnvironmentVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.environmentVersions.publish("test-rg", "my-aml-workspace", "string", "string", {
    destinationName: "string",
    destinationVersion: "string",
    registryName: "string",
  });
}

async function main(): Promise<void> {
  await publishWorkspaceEnvironmentVersion();
}

main().catch(console.error);
