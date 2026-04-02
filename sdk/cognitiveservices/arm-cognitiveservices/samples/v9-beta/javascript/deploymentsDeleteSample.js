// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified deployment associated with the Cognitive Services account.
 *
 * @summary deletes the specified deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/DeleteDeployment.json
 */
async function deleteDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.deployments.delete("resourceGroupName", "accountName", "deploymentName");
}

async function main() {
  await deleteDeployment();
}

main().catch(console.error);
