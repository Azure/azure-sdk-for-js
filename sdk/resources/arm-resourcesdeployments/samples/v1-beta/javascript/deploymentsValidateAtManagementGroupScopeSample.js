// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourcesClient } = require("@azure/arm-resourcesdeployments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 *
 * @summary validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 * x-ms-original-file: 2025-04-01/PostDeploymentValidateOnManagementGroup.json
 */
async function validatesATemplateAtManagementGroupScope() {
  const credential = new DefaultAzureCredential();
  const client = new ResourcesClient(credential);
  const result = await client.deployments.validateAtManagementGroupScope(
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

async function main() {
  await validatesATemplateAtManagementGroupScope();
}

main().catch(console.error);
