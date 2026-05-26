// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get API for managed network settings of a cognitive services account.
 *
 * @summary get API for managed network settings of a cognitive services account.
 * x-ms-original-file: 2026-01-15-preview/ManagedNetwork/getManagedNetworkV2.json
 */
async function getManagedNetworkSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedNetworkSettings.get(
    "test-rg",
    "cognitive-account-name",
    "default",
  );
  console.log(result);
}

async function main() {
  await getManagedNetworkSettings();
}

main().catch(console.error);
