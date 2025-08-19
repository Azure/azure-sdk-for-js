// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists a workflow run expression trace.
 *
 * @summary Lists a workflow run expression trace.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/WorkflowRunActions_ListExpressionTraces.json
 */

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listExpressionTraces(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const workflowName = "testFlow";
  const runName = "08586776228332053161046300351";
  const actionName = "testAction";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflowRunActions.listExpressionTraces(
    resourceGroupName,
    workflowName,
    runName,
    actionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listExpressionTraces();
}

main().catch(console.error);
