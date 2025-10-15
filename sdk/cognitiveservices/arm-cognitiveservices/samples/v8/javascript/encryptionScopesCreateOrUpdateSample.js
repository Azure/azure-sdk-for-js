// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update the state of specified encryptionScope associated with the Cognitive Services account.
 *
 * @summary Update the state of specified encryptionScope associated with the Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/PutEncryptionScope.json
 */
async function putEncryptionScope() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const encryptionScopeName = "encryptionScopeName";
  const encryptionScope = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.encryptionScopes.createOrUpdate(
    resourceGroupName,
    accountName,
    encryptionScopeName,
    encryptionScope,
  );
  console.log(result);
}

async function main() {
  await putEncryptionScope();
}

main().catch(console.error);
