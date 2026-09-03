// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to query triggers.
 *
 * @summary query triggers.
 * x-ms-original-file: 2018-06-01/Triggers_QueryByFactory.json
 */
async function triggersQueryByFactory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.triggers.queryByFactory(
    "exampleResourceGroup",
    "exampleFactoryName",
    { parentTriggerName: "exampleTrigger" },
  );
  console.log(result);
}

async function main() {
  await triggersQueryByFactory();
}

main().catch(console.error);
