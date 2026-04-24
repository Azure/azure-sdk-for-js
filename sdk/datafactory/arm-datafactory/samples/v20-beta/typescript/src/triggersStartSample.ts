// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a trigger.
 *
 * @summary starts a trigger.
 * x-ms-original-file: 2018-06-01/Triggers_Start.json
 */
async function triggersStart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.triggers.start("exampleResourceGroup", "exampleFactoryName", "exampleTrigger");
}

async function main(): Promise<void> {
  await triggersStart();
}

main().catch(console.error);
