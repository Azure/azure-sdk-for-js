// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provisions the managed network of a cognitive services account.
 *
 * @summary provisions the managed network of a cognitive services account.
 * x-ms-original-file: 2026-01-15-preview/ManagedNetwork/provisionManagedNetwork.json
 */
async function provisionManagedNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.managedNetworkProvisions.provisionManagedNetwork(
    "test-rg",
    "cognitive-account-name",
    "default",
    { body: {} },
  );
  console.log(result);
}

async function main() {
  await provisionManagedNetwork();
}

main().catch(console.error);
