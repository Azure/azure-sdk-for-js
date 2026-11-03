// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists a workflow run expression trace.
 *
 * @summary lists a workflow run expression trace.
 * x-ms-original-file: 2025-05-01/WorkflowRunActionRepetitions_ListExpressionTraces.json
 */
async function listExpressionTracesForARepetition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflowRunActionRepetitions.listExpressionTraces(
    "testResourceGroup",
    "test-name",
    "testFlow",
    "08586776228332053161046300351",
    "testAction",
    "000001",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listExpressionTracesForARepetition();
}

main().catch(console.error);
