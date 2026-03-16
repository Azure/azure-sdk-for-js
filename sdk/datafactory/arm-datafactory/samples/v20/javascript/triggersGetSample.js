// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a trigger.
 *
 * @summary gets a trigger.
 * x-ms-original-file: 2018-06-01/Triggers_Get.json
 */
async function triggersGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.triggers.get(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleTrigger",
  );
  console.log(result);
}

async function main() {
  await triggersGet();
}

main().catch(console.error);
