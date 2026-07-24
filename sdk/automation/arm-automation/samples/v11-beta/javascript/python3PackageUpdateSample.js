// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the python 3 package identified by package name.
 *
 * @summary update the python 3 package identified by package name.
 * x-ms-original-file: 2024-10-23/updatePython3Package.json
 */
async function updateAModule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.python3Package.update(
    "rg",
    "MyAutomationAccount",
    "MyPython3Package",
    { tags: {} },
  );
  console.log(result);
}

async function main() {
  await updateAModule();
}

main().catch(console.error);
