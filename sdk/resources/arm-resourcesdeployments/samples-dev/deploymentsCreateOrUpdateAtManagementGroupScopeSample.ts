// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to You can provide the template and parameters directly in the request or link to JSON files.
 *
 * @summary You can provide the template and parameters directly in the request or link to JSON files.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/deployments/stable/2025-04-01/examples/PutDeploymentAtManagementGroup.json
 */

import {
  ScopedDeployment,
  DeploymentsClient,
} from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createDeploymentAtManagementGroupScope(): Promise<void> {
  const groupId = "my-management-group-id";
  const deploymentName = "my-deployment";
  const parameters: ScopedDeployment = {
    location: "eastus",
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: { uri: "https://example.com/exampleTemplate.json" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DeploymentsClient(credential);
  const result =
    await client.deployments.beginCreateOrUpdateAtManagementGroupScopeAndWait(
      groupId,
      deploymentName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createDeploymentAtManagementGroupScope();
}

main().catch(console.error);
