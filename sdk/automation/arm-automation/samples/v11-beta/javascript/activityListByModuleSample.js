// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve a list of activities in the module identified by module name.
 *
 * @summary retrieve a list of activities in the module identified by module name.
 * x-ms-original-file: 2024-10-23/listActivitiesByModule.json
 */
async function listActivitiesByAModule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.activity.listByModule(
    "rg",
    "myAutomationAccount33",
    "OmsCompositeResources",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listActivitiesByAModule();
}

main().catch(console.error);
