// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Dev Box definitions configured for a project.
 *
 * @summary list Dev Box definitions configured for a project.
 * x-ms-original-file: 2026-01-01-preview/DevBoxDefinitions_ListByProject.json
 */
async function devBoxDefinitionsListByProject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.devBoxDefinitions.listByProject("rg1", "ContosoProject")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await devBoxDefinitionsListByProject();
}

main().catch(console.error);
