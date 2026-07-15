// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of source controls.
 *
 * @summary retrieve a list of source controls.
 * x-ms-original-file: 2024-10-23/sourceControl/getAllSourceControls.json
 */
async function listSourceControls() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sourceControlOperations.listByAutomationAccount(
    "rg",
    "sampleAccount9",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSourceControls();
}

main().catch(console.error);
