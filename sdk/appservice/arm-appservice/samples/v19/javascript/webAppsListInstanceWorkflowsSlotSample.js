// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the workflows for a web site, or a deployment slot.
 *
 * @summary list the workflows for a web site, or a deployment slot.
 * x-ms-original-file: 2025-05-01/ListWorkflows_Slot.json
 */
async function listTheWorkflowsSlot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webApps.listInstanceWorkflowsSlot(
    "testrg123",
    "testsite2",
    "staging",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheWorkflowsSlot();
}

main().catch(console.error);
