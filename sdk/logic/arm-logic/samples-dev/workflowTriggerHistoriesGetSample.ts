// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a workflow trigger history.
 *
 * @summary Gets a workflow trigger history.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/WorkflowTriggerHistories_Get.json
 */
async function getAWorkflowTriggerHistory(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const workflowName = "testWorkflowName";
  const triggerName = "testTriggerName";
  const historyName = "08586676746934337772206998657CU22";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflowTriggerHistories.get(
    resourceGroupName,
    workflowName,
    triggerName,
    historyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkflowTriggerHistory();
}

main().catch(console.error);
