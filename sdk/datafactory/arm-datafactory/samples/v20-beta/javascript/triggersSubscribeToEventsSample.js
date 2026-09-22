// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to subscribe event trigger to events.
 *
 * @summary subscribe event trigger to events.
 * x-ms-original-file: 2018-06-01/Triggers_SubscribeToEvents.json
 */
async function triggersSubscribeToEvents() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.triggers.subscribeToEvents(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleTrigger",
  );
  console.log(result);
}

async function main() {
  await triggersSubscribeToEvents();
}

main().catch(console.error);
