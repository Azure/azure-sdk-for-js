// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeploymentsClient } = require("@azure/arm-resourcesdeployments");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 *
 * @summary validates whether the specified template is syntactically correct and will be accepted by Azure Resource Manager..
 * x-ms-original-file: 2025-04-01/PostDeploymentValidateOnSubscription.json
 */
async function validatesATemplateAtSubscriptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000001";
  const client = new DeploymentsClient(credential, subscriptionId);
  const result = await client.deployments.validateAtSubscriptionScope("my-deployment", {
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
  await validatesATemplateAtSubscriptionScope();
}

main().catch(console.error);
