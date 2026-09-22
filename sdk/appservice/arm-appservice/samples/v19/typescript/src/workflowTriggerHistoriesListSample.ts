// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of workflow trigger histories.
 *
 * @summary gets a list of workflow trigger histories.
 * x-ms-original-file: 2025-05-01/WorkflowTriggerHistories_List.json
 */
async function listAWorkflowTriggerHistory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflowTriggerHistories.list(
    "testResourceGroup",
    "test-name",
    "testWorkflowName",
    "testTriggerName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAWorkflowTriggerHistory();
}

main().catch(console.error);
