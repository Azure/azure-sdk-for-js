// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a trigger's event subscription status.
 *
 * @summary get a trigger's event subscription status.
 * x-ms-original-file: 2018-06-01/Triggers_GetEventSubscriptionStatus.json
 */
async function triggersGetEventSubscriptionStatus(): Promise<void> {
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

async function main(): Promise<void> {
  await triggersGetEventSubscriptionStatus();
}

main().catch(console.error);
