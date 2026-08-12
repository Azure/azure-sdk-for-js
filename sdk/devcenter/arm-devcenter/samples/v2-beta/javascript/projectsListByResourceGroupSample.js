// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all projects in the resource group.
 *
 * @summary lists all projects in the resource group.
 * x-ms-original-file: 2026-01-01-preview/Projects_ListByResourceGroup.json
 */
async function projectsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projects.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await projectsListByResourceGroup();
}

main().catch(console.error);
