// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Cognitive Services account connection under the specified account.
 *
 * @summary update Cognitive Services account connection under the specified account.
 * x-ms-original-file: 2026-01-15-preview/AccountConnection/update.json
 */
async function updateAccountConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accountConnections.update("test-rg", "account-1", "connection-1", {
    connection: {
      properties: {
        authType: "AccessKey",
        category: "ADLSGen2",
        credentials: { accessKeyId: "some_string", secretAccessKey: "some_string" },
        expiryTime: new Date("2020-01-01T00:00:00Z"),
        metadata: {},
        target: "some_string",
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAccountConnection();
}

main().catch(console.error);
