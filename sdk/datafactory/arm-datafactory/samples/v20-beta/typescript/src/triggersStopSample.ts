// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops a trigger.
 *
 * @summary stops a trigger.
 * x-ms-original-file: 2018-06-01/Triggers_Stop.json
 */
async function triggersStop(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.triggers.stop("exampleResourceGroup", "exampleFactoryName", "exampleTrigger");
}

async function main(): Promise<void> {
  await triggersStop();
}

main().catch(console.error);
