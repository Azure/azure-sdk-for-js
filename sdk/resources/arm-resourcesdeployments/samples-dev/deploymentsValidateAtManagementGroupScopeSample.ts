// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 *
 * @summary Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/deployments/stable/2025-04-01/examples/PostDeploymentValidateOnManagementGroup.json
 */

import {
  ScopedDeployment,
  DeploymentsClient,
} from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validatesATemplateAtManagementGroupScope(): Promise<void> {
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
    await client.deployments.beginValidateAtManagementGroupScopeAndWait(
      groupId,
      deploymentName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await validatesATemplateAtManagementGroupScope();
}

main().catch(console.error);
