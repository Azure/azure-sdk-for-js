// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unsubscribe event trigger from events.
 *
 * @summary unsubscribe event trigger from events.
 * x-ms-original-file: 2018-06-01/Triggers_UnsubscribeFromEvents.json
 */
async function triggersUnsubscribeFromEvents() {
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

async function main() {
  await triggersUnsubscribeFromEvents();
}

main().catch(console.error);
