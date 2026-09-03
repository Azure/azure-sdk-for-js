// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops a trigger.
 *
 * @summary stops a trigger.
 * x-ms-original-file: 2018-06-01/Triggers_Stop.json
 */
async function triggersStop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.triggers.stop("exampleResourceGroup", "exampleFactoryName", "exampleTrigger");
}

async function main() {
  await triggersStop();
}

main().catch(console.error);
