// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an EnvironmentVersion.
 *
 * @summary creates or updates an EnvironmentVersion.
 * x-ms-original-file: 2025-12-01/Workspace/EnvironmentVersion/createOrUpdate.json
 */
async function createOrUpdateWorkspaceEnvironmentVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.environmentVersions.createOrUpdate(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    {
      properties: {
        description: "string",
        build: {
          contextUri:
            "https://storage-account.blob.core.windows.net/azureml/DockerBuildContext/95ddede6b9b8c4e90472db3acd0a8d28/",
          dockerfilePath: "prod/Dockerfile",
        },
        condaFile: "string",
        image: "docker.io/tensorflow/serving:latest",
        inferenceConfig: {
          livenessRoute: { path: "string", port: 1 },
          readinessRoute: { path: "string", port: 1 },
          scoringRoute: { path: "string", port: 1 },
        },
        isAnonymous: false,
        properties: { string: "string" },
        tags: { string: "string" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceEnvironmentVersion();
}

main().catch(console.error);
