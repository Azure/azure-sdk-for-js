// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the module identified by module name.
 *
 * @summary retrieve the module identified by module name.
 * x-ms-original-file: 2024-10-23/getModule.json
 */
async function getAModule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.module.get("rg", "myAutomationAccount33", "OmsCompositeResources");
  console.log(result);
}

async function main() {
  await getAModule();
}

main().catch(console.error);
