// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a connection.
 *
 * @summary update a connection.
 * x-ms-original-file: 2024-10-23/updateConnection.json
 */
async function updateAConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.connection.update("rg", "myAutomationAccount28", "myConnection", {
    name: "myConnection",
    description: "my description goes here",
    fieldDefinitionValues: {
      AutomationCertificateName: "myCertificateName",
      SubscriptionID: "b5e4748c-f69a-467c-8749-e2f9c8cd3009",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAConnection();
}

main().catch(console.error);
