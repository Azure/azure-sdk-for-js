// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all VnetConnections in the specified SandboxGroup.
 *
 * @summary list all VnetConnections in the specified SandboxGroup.
 * x-ms-original-file: 2026-07-01/VnetConnections_ListBySandboxGroup.json
 */
async function listVnetConnectionsBySandboxGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vnetConnections.listBySandboxGroup("myRg", "testgroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVnetConnectionsBySandboxGroup();
}

main().catch(console.error);
