// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Arc deployment associated with the Cognitive Services account.
 *
 * @summary deletes the specified Arc deployment associated with the Cognitive Services account.
 * x-ms-original-file: 2026-07-15-preview/DeleteArcDeployment.json
 */
async function deleteArcDeployment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.arcDeployments.delete("resourceGroupName", "accountName", "phi-3-arc");
}

async function main() {
  await deleteArcDeployment();
}

main().catch(console.error);
