// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the a list of Packages
 *
 * @summary retrieve the a list of Packages
 * x-ms-original-file: 2024-10-23/package/listPackagesByRuntimeEnvironment.json
 */
async function getAPackage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.package.listByRuntimeEnvironment(
    "rg",
    "myAutomationAccount33",
    "runtimeEnvironmentName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAPackage();
}

main().catch(console.error);
