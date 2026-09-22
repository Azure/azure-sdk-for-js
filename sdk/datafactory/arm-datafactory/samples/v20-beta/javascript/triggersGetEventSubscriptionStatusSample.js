// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a trigger's event subscription status.
 *
 * @summary get a trigger's event subscription status.
 * x-ms-original-file: 2018-06-01/Triggers_GetEventSubscriptionStatus.json
 */
async function triggersGetEventSubscriptionStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.triggers.getEventSubscriptionStatus(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleTrigger",
  );
  console.log(result);
}

async function main() {
  await triggersGetEventSubscriptionStatus();
}

main().catch(console.error);
