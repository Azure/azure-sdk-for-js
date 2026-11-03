// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a trigger.
 *
 * @summary deletes a trigger.
 * x-ms-original-file: 2018-06-01/Triggers_Delete.json
 */
async function triggersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.triggers.delete("exampleResourceGroup", "exampleFactoryName", "exampleTrigger");
}

async function main() {
  await triggersDelete();
}

main().catch(console.error);
