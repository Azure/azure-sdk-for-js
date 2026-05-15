// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourcesClient } = require("@azure/arm-resourcesdeployments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns changes that will be made by the deployment if executed at the scope of the management group.
 *
 * @summary returns changes that will be made by the deployment if executed at the scope of the management group.
 * x-ms-original-file: 2025-04-01/PostDeploymentWhatIfOnManagementGroup.json
 */
async function predictTemplateChangesAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new ResourcesClient(credential);
  const result = await client.deployments.whatIfAtManagementGroupScope(
    "myManagementGruop",
    "exampleDeploymentName",
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

async function main() {
  await predictTemplateChangesAtManagementGroupScope();
}

main().catch(console.error);
