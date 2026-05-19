// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified encryptionScope associated with the Cognitive Services account.
 *
 * @summary deletes the specified encryptionScope associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/DeleteEncryptionScope.json
 */
async function deleteEncryptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.encryptionScopes.delete("resourceGroupName", "accountName", "encryptionScopeName");
}

async function main() {
  await deleteEncryptionScope();
}

main().catch(console.error);
