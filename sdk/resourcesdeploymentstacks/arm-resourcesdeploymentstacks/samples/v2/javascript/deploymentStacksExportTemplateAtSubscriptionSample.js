// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentStacksClient } = require("@azure/arm-resourcesdeploymentstacks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to exports the template used to create the Deployment stack at the specified scope.
 *
 * @summary exports the template used to create the Deployment stack at the specified scope.
 * x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionExportTemplate.json
 */
async function exportTheDeploymentTemplateForASubscriptionDeploymentStack() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeploymentStacksClient(credential, subscriptionId);
  const result =
    await client.deploymentStacks.exportTemplateAtSubscription("simpleDeploymentStack");
  console.log(result);
}

async function main() {
  await exportTheDeploymentTemplateForASubscriptionDeploymentStack();
}

main().catch(console.error);
