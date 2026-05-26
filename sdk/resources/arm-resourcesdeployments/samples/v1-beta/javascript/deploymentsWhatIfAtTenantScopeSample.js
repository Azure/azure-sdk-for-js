// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentsClient } = require("@azure/arm-resourcesdeployments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns changes that will be made by the deployment if executed at the scope of the tenant group.
 *
 * @summary returns changes that will be made by the deployment if executed at the scope of the tenant group.
 * x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnTenant.json
 */
async function predictTemplateChangesAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new DeploymentsClient(credential);
  const result = await client.deployments.whatIfAtTenantScope("exampleDeploymentName", {
    location: "eastus",
    properties: {
      mode: "Incremental",
      parameters: {},
      templateLink: { uri: "https://example.com/exampleTemplate.json" },
    },
  });
  console.log(result);
}

async function main() {
  await predictTemplateChangesAtManagementGroupScope();
}

main().catch(console.error);
