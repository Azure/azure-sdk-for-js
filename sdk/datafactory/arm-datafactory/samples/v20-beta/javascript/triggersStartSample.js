// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a trigger.
 *
 * @summary starts a trigger.
 * x-ms-original-file: 2018-06-01/Triggers_Start.json
 */
async function triggersStart() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.triggers.start("exampleResourceGroup", "exampleFactoryName", "exampleTrigger");
}

async function main() {
  await triggersStart();
}

main().catch(console.error);
