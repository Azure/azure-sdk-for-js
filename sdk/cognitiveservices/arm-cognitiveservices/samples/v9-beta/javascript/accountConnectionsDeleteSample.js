// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Cognitive Services account connection by name.
 *
 * @summary delete Cognitive Services account connection by name.
 * x-ms-original-file: 2026-01-15-preview/AccountConnection/delete.json
 */
async function deleteAccountConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.accountConnections.delete("resourceGroup-1", "account-1", "connection-1");
}

async function main() {
  await deleteAccountConnection();
}

main().catch(console.error);
