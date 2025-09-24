// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns changes that will be made by the deployment if executed at the scope of the tenant group.
 *
 * @summary Returns changes that will be made by the deployment if executed at the scope of the tenant group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/deployments/stable/2025-04-01/examples/PostDeploymentWhatIfOnTenant.json
 */

import {
  ScopedDeploymentWhatIf,
  DeploymentsClient,
} from "@azure/arm-resourcesdeployments";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function predictTemplateChangesAtManagementGroupScope(): Promise<void> {
  const deploymentName = "exampleDeploymentName";
  const parameters: ScopedDeploymentWhatIf = {
    location: "eastus",
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: { uri: "https://example.com/exampleTemplate.json" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DeploymentsClient(credential);
  const result = await client.deployments.beginWhatIfAtTenantScopeAndWait(
    deploymentName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await predictTemplateChangesAtManagementGroupScope();
}

main().catch(console.error);
