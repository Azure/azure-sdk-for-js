// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns list of Linkers which connects to the resource. which supports to config both application and target service during the resource provision.
 *
 * @summary returns list of Linkers which connects to the resource. which supports to config both application and target service during the resource provision.
 * x-ms-original-file: 2024-07-01-preview/LinkerList.json
 */
async function linkerList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.linker.list(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await linkerList();
}

main().catch(console.error);
