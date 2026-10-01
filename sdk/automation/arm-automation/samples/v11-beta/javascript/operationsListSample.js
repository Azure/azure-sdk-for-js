// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available Automation REST API operations.
 *
 * @summary lists all of the available Automation REST API operations.
 * x-ms-original-file: 2024-10-23/listRestAPIOperations.json
 */
async function listsAllOfTheAvailableAutomationRestAPIOperations() {
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllOfTheAvailableAutomationRestAPIOperations();
}

main().catch(console.error);
