// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the Runtime Environment.
 *
 * @summary delete the Runtime Environment.
 * x-ms-original-file: 2024-10-23/runtimeEnvironment/deleteRuntimeEnvironment.json
 */
async function deleteRuntimeEnvironment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.runtimeEnvironments.delete("rg", "myAutomationAccount9", "myRuntimeEnvironmentName");
}

async function main() {
  await deleteRuntimeEnvironment();
}

main().catch(console.error);
