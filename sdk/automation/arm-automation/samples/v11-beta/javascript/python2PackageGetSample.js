// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the python 2 package identified by package name.
 *
 * @summary retrieve the python 2 package identified by package name.
 * x-ms-original-file: 2024-10-23/getPython2Package.json
 */
async function getAPython2Package() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.python2Package.get(
    "rg",
    "myAutomationAccount33",
    "OmsCompositeResources",
  );
  console.log(result);
}

async function main() {
  await getAPython2Package();
}

main().catch(console.error);
