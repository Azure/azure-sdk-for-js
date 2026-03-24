// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the workflows for a web site, or a deployment slot.
 *
 * @summary list the workflows for a web site, or a deployment slot.
 * x-ms-original-file: 2025-05-01/ListWorkflows_Slot.json
 */
async function listTheWorkflowsSlot(): Promise<void> {
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

async function main(): Promise<void> {
  await listTheWorkflowsSlot();
}

main().catch(console.error);
