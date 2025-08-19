// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a workflow run request history.
 *
 * @summary Gets a workflow run request history.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/WorkflowRunActionRequestHistories_Get.json
 */
async function getARequestHistory(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "test-resource-group";
  const workflowName = "test-workflow";
  const runName = "08586776228332053161046300351";
  const actionName = "HTTP_Webhook";
  const requestHistoryName = "08586611142732800686";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflowRunActionRequestHistories.get(
    resourceGroupName,
    workflowName,
    runName,
    actionName,
    requestHistoryName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getARequestHistory();
}

main().catch(console.error);
