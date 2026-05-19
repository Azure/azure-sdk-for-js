// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list API for managed network settings of a cognitive services account.
 *
 * @summary list API for managed network settings of a cognitive services account.
 * x-ms-original-file: 2026-01-15-preview/ManagedNetwork/listManagedNetworkV2.json
 */
async function listManagedNetworkSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedNetworkSettings.list(
    "test-rg",
    "cognitive-account-name",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedNetworkSettings();
}

main().catch(console.error);
