// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified deployments associated with the Cognitive Services account.
 *
 * @summary update the state of specified deployments associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/PutDeployment.json
 */
async function putDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.deployments.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "deploymentName",
    {
      properties: {
        deploymentState: "Running",
        model: { name: "ada", format: "OpenAI", version: "1" },
        serviceTier: "Priority",
      },
      sku: { name: "Standard", capacity: 1 },
    },
  );
  console.log(result);
}

async function main() {
  await putDeployment();
}

main().catch(console.error);
