// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of python 2 packages.
 *
 * @summary retrieve a list of python 2 packages.
 * x-ms-original-file: 2024-10-23/listPython2PackagesByAutomationAccount.json
 */
async function listPython2PackagesByAutomationAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.python2Package.listByAutomationAccount(
    "rg",
    "myAutomationAccount33",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPython2PackagesByAutomationAccount();
}

main().catch(console.error);
