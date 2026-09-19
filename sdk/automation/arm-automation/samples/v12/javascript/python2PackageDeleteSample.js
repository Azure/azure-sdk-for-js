// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the python 2 package by name.
 *
 * @summary delete the python 2 package by name.
 * x-ms-original-file: 2024-10-23/deletePython2Package.json
 */
async function deleteAPython2Package() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.python2Package.delete("rg", "myAutomationAccount33", "OmsCompositeResources");
}

async function main() {
  await deleteAPython2Package();
}

main().catch(console.error);
