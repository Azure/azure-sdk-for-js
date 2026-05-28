// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create the rai safety provider associated with the subscription.
 *
 * @summary create the rai safety provider associated with the subscription.
 * x-ms-original-file: 2026-01-15-preview/PutRaiExternalSafetyProvider.json
 */
async function putRaiExternalSafetyProvider() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiExternalSafetyProvider.createOrUpdate("safetyProviderName", {
    properties: {
      keyVaultUri: "https://example.vault.azure.net",
      managedIdentity: "00000000-0000-0000-0000-000000000000",
      mode: "sync",
      providerId: "00000000-0000-0000-0000-000000000000",
      providerName: "safetyProviderName",
      secretName: "mySecretName",
      url: "https://example.webhook.endpoint",
    },
  });
  console.log(result);
}

async function main() {
  await putRaiExternalSafetyProvider();
}

main().catch(console.error);
