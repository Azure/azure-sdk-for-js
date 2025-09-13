// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 *
 * @summary Validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/deployments/stable/2025-04-01/examples/PostDeploymentValidateOnTenant.json
 */

import {
  ScopedDeployment,
  DeploymentsClient,
} from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validatesATemplateAtTenantScope(): Promise<void> {
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
  const result = await client.deployments.beginValidateAtTenantScopeAndWait(
    deploymentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validatesATemplateAtTenantScope();
}

main().catch(console.error);
