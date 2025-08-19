// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Resubmits a workflow run based on the trigger history.
 *
 * @summary Resubmits a workflow run based on the trigger history.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/WorkflowTriggerHistories_Resubmit.json
 */

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function resubmitAWorkflowRunBasedOnTheTriggerHistory(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const workflowName = "testWorkflowName";
  const triggerName = "testTriggerName";
  const historyName = "testHistoryName";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflowTriggerHistories.resubmit(
    resourceGroupName,
    workflowName,
    triggerName,
    historyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resubmitAWorkflowRunBasedOnTheTriggerHistory();
}

main().catch(console.error);
