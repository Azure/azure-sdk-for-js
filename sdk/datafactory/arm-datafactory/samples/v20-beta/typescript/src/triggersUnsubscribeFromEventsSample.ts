// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to unsubscribe event trigger from events.
 *
 * @summary unsubscribe event trigger from events.
 * x-ms-original-file: 2018-06-01/Triggers_UnsubscribeFromEvents.json
 */
async function triggersUnsubscribeFromEvents(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.triggers.unsubscribeFromEvents(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleTrigger",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await triggersUnsubscribeFromEvents();
}

main().catch(console.error);
