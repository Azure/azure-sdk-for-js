// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the module by name.
 *
 * @summary delete the module by name.
 * x-ms-original-file: 2024-10-23/deleteModule.json
 */
async function deleteAModule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.module.delete("rg", "myAutomationAccount33", "OmsCompositeResources");
}

async function main() {
  await deleteAModule();
}

main().catch(console.error);
