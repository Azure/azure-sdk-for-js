// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified EncryptionScope associated with the Cognitive Services account.
 *
 * @summary gets the specified EncryptionScope associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/GetEncryptionScope.json
 */
async function getEncryptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.encryptionScopes.get(
    "resourceGroupName",
    "accountName",
    "encryptionScopeName",
  );
  console.log(result);
}

async function main() {
  await getEncryptionScope();
}

main().catch(console.error);
