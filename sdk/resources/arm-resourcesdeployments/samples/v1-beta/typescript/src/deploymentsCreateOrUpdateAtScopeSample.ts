// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentsClient } from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to you can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary you can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: 2025-04-01/PutDeploymentAtScope.json
 */
async function createDeploymentAtAGivenScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentsClient(credential);
  const result = await client.deployments.createOrUpdateAtScope(
    "providers/Microsoft.Management/managementGroups/my-management-group-id",
    "my-deployment",
    {
      location: "eastus",
      properties: {
        mode: "Incremental",
        parameters: {},
        templateLink: { uri: "https://example.com/exampleTemplate.json" },
      },
      tags: { tagKey1: "tag-value-1", tagKey2: "tag-value-2" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createDeploymentAtAGivenScope();
}

main().catch(console.error);
