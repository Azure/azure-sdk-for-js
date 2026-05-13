// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update Cognitive Services account connection under the specified account.
 *
 * @summary create or update Cognitive Services account connection under the specified account.
 * x-ms-original-file: 2026-01-15-preview/AccountConnection/create.json
 */
async function createAccountConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accountConnections.create(
    "resourceGroup-1",
    "account-1",
    "connection-1",
    {
      connection: {
        properties: {
          authType: "None",
          category: "ContainerRegistry",
          expiryTime: new Date("2024-03-15T14:30:00Z"),
          target: "[target url]",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createAccountConnection();
}

main().catch(console.error);
