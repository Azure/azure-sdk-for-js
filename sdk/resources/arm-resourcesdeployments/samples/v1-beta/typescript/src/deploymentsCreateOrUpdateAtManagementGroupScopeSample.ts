// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourcesClient } from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to you can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary you can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: 2025-04-01/PutDeploymentAtManagementGroup.json
 */
async function createDeploymentAtManagementGroupScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ResourcesClient(credential);
  const result = await client.deployments.createOrUpdateAtManagementGroupScope(
    "my-management-group-id",
    "my-deployment",
    {
      location: "eastus",
      properties: {
        mode: "Incremental",
        parameters: {},
        templateLink: { uri: "https://example.com/exampleTemplate.json" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createDeploymentAtManagementGroupScope();
}

main().catch(console.error);
