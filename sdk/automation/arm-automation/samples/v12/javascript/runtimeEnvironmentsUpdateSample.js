// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an Runtime Environment.
 *
 * @summary update an Runtime Environment.
 * x-ms-original-file: 2024-10-23/runtimeEnvironment/updateRuntimeEnvironment.json
 */
async function updateAnAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.runtimeEnvironments.update(
    "rg",
    "myAutomationAccount9",
    "myRuntimeEnvironmentName",
    { defaultPackages: { Az: "12.3.0" } },
  );
  console.log(result);
}

async function main() {
  await updateAnAutomationAccount();
}

main().catch(console.error);
