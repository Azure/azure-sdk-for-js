// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to You can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary You can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/deployments/stable/2025-04-01/examples/PutDeploymentAtScope.json
 */

import { Deployment, DeploymentsClient } from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createDeploymentAtAGivenScope(): Promise<void> {
  const scope =
    "providers/Microsoft.Management/managementGroups/my-management-group-id";
  const deploymentName = "my-deployment";
  const parameters: Deployment = {
    location: "eastus",
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: { uri: "https://example.com/exampleTemplate.json" },
    },
    tags: { tagKey1: "tag-value-1", tagKey2: "tag-value-2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DeploymentsClient(credential);
  const result = await client.deployments.beginCreateOrUpdateAtScopeAndWait(
    scope,
    deploymentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createDeploymentAtAGivenScope();
}

main().catch(console.error);
