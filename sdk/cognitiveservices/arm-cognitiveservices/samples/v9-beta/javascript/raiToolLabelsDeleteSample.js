// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified RAI Tool Label associated with the Azure OpenAI account.
 *
 * @summary deletes the specified RAI Tool Label associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/DeleteRaiToolLabel.json
 */
async function deleteRaiToolLabel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiToolLabels.delete("resourceGroupName", "accountName", "Web_Search");
}

async function main() {
  await deleteRaiToolLabel();
}

main().catch(console.error);
