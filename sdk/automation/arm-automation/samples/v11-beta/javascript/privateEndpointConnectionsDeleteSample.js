// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a private endpoint connection with a given name.
 *
 * @summary deletes a private endpoint connection with a given name.
 * x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionDelete.json
 */
async function deletesAPrivateEndpointConnectionWithAGivenName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AutomationClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "rg1",
    "automationAccountName",
    "privateEndpointConnectionName",
  );
}

async function main() {
  await deletesAPrivateEndpointConnectionWithAGivenName();
}

main().catch(console.error);
