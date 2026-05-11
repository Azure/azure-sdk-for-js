// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified deployments associated with the Cognitive Services account.
 *
 * @summary gets the specified deployments associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/GetDeployment.json
 */
async function getDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.deployments.get("resourceGroupName", "accountName", "deploymentName");
  console.log(result);
}

async function main() {
  await getDeployment();
}

main().catch(console.error);
