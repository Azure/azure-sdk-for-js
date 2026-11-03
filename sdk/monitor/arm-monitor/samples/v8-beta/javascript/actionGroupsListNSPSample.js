// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of NSP configurations for specified action group.
 *
 * @summary gets a list of NSP configurations for specified action group.
 * x-ms-original-file: 2021-10-01/NSPForActionGroups_List.json
 */
async function getAnActionGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.actionGroups.listNSP("exampleRG", "someActionGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAnActionGroup();
}

main().catch(console.error);
