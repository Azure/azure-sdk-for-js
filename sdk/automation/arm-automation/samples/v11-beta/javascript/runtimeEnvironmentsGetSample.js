// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information about the Runtime Environment
 *
 * @summary get information about the Runtime Environment
 * x-ms-original-file: 2024-10-23/runtimeEnvironment/getRuntimeEnvironment.json
 */
async function getAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.runtimeEnvironments.get(
    "rg",
    "myAutomationAccount9",
    "myRuntimeEnvironmentName",
  );
  console.log(result);
}

async function main() {
  await getAutomationAccount();
}

main().catch(console.error);
