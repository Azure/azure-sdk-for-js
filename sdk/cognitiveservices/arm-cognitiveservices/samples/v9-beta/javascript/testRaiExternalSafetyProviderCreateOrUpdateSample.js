// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to test the rai safety provider associated with the subscription.
 *
 * @summary test the rai safety provider associated with the subscription.
 * x-ms-original-file: 2026-01-15-preview/TestRaiExternalSafetyProvider.json
 */
async function testRaiExternalSafetyProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.testRaiExternalSafetyProvider.createOrUpdate(
    "myResourceGroup",
    "myCognitiveAccount",
    "mySafetyProvider",
    {
      properties: {
        keyVaultUri: "https://contoso-vault.vault.azure.net/",
        managedIdentity: "f3b9c2e7-4aad-4b1f-9d9c-9e9b1e9b1f9b",
        mode: "sync",
        providerId: "00000000-0000-0000-0000-000000000000",
        providerName: "safetyProviderName",
        secretName: "safety-provider-secret",
        url: "https://example-safety-provider.contoso.com/webhook",
      },
    },
  );
  console.log(result);
}

async function main() {
  await testRaiExternalSafetyProvider();
}

main().catch(console.error);
