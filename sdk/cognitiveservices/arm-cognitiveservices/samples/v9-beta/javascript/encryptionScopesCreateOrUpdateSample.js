// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the state of specified encryptionScope associated with the Cognitive Services account.
 *
 * @summary update the state of specified encryptionScope associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/PutEncryptionScope.json
 */
async function putEncryptionScope() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.encryptionScopes.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "encryptionScopeName",
    {
      properties: {
        keySource: "Microsoft.KeyVault",
        keyVaultProperties: {
          identityClientId: "00000000-0000-0000-0000-000000000000",
          keyName: "DevKeyWestUS2",
          keyVaultUri: "https://devkvwestus2.vault.azure.net/",
          keyVersion: "9f85549d7bf14ff4bf178c10d3bdca95",
        },
        state: "Enabled",
      },
    },
  );
  console.log(result);
}

async function main() {
  await putEncryptionScope();
}

main().catch(console.error);
