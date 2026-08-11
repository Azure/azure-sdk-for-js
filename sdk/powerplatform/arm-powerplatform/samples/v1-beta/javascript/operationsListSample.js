// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerPlatformClient } = require("@azure/arm-powerplatform");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available PowerPlatform REST API operations.
 *
 * @summary lists all of the available PowerPlatform REST API operations.
 * x-ms-original-file: 2020-10-30-preview/listOperations.json
 */
async function listsAllOfTheAvailablePowerPlatformRestAPIOperations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PowerPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllOfTheAvailablePowerPlatformRestAPIOperations();
}

main().catch(console.error);
